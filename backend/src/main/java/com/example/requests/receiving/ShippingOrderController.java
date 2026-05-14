package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shipping-orders")
public class ShippingOrderController {
    private final ShippingOrderRepository orderRepository;
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;
    private final ContainerOwnerService containerOwnerService;
    private final ContainerStorageService storageService;
    private final TosOperationFactService tosOperationFactService;

    public ShippingOrderController(
        ShippingOrderRepository orderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository,
        ContainerOwnerService containerOwnerService,
        ContainerStorageService storageService,
        TosOperationFactService tosOperationFactService
    ) {
        this.orderRepository = orderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
        this.containerOwnerService = containerOwnerService;
        this.storageService = storageService;
        this.tosOperationFactService = tosOperationFactService;
    }

    @GetMapping
    public List<ShippingOrderResponse> list() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(ShippingOrderResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public ShippingOrderResponse create(@Valid @RequestBody CreateShippingOrderDto dto) {
        ClientEntity client = clientRepository.findById(dto.clientId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown client"));

        List<String> requestedNumbers = dto.containerNumbers().stream()
            .map(String::trim)
            .filter(number -> !number.isBlank())
            .collect(Collectors.collectingAndThen(Collectors.toCollection(LinkedHashSet::new), List::copyOf));

        Map<String, ContainerEntity> containersByNumber = containerRepository.findAllByOrderByNumberAsc().stream()
            .collect(Collectors.toMap(container -> normalize(container.getNumber()), Function.identity()));

        List<String> missing = requestedNumbers.stream()
            .filter(number -> !containersByNumber.containsKey(normalize(number)))
            .toList();

        if (!missing.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown containers: " + String.join(", ", missing));
        }

        List<ContainerEntity> requestedContainers = requestedNumbers.stream()
            .map(number -> containersByNumber.get(normalize(number)))
            .toList();
        containerOwnerService.validateContainersBelongToClient(requestedContainers, client);

        ShippingOrder order = new ShippingOrder();
        order.setNumber(nextOrderNumber());
        order.setClient(client);
        order.setPlannedShippingDate(dto.plannedShippingDate());
        requestedContainers.forEach(order::addContainer);

        ShippingOrder saved = orderRepository.saveAndFlush(order);
        return ShippingOrderResponse.fromEntity(saved);
    }

    @PostMapping("/{orderId}/containers/{linkId}/finish")
    @Transactional
    public ShippingOrderResponse finishContainer(
        @PathVariable Long orderId,
        @PathVariable Long linkId,
        @Valid @RequestBody FinishContainerDto dto
    ) {
        ShippingOrder order = orderRepository.findWithContainersById(orderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Shipping order was not found"));

        ShippingOrderContainer link = order.getContainers().stream()
            .filter(currentLink -> currentLink.getId().equals(linkId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Container was not found in shipping order"));

        if (link.getStatus() != ShippingOrderContainerStatus.FINISHED) {
            link.setStatus(ShippingOrderContainerStatus.FINISHED);
            link.setFinishedAt(startOfDay(dto.actualDate()));
            storageService.closeStoragePeriod(link.getContainer(), dto.actualDate());
            tosOperationFactService.recordShippingContainerFinished(order, link, dto.actualDate());
        }

        boolean allContainersFinished = order.getContainers().stream()
            .allMatch(currentLink -> currentLink.getStatus() == ShippingOrderContainerStatus.FINISHED);

        if (allContainersFinished && order.getStatus() != ShippingOrderStatus.COMPLETED) {
            order.setStatus(ShippingOrderStatus.COMPLETED);
            order.setActualShippingDate(dto.actualDate());
            order.setCompletedAt(startOfDay(dto.actualDate()));
            containerOwnerService.createShippingHistory(order);
        }

        return ShippingOrderResponse.fromEntity(orderRepository.save(order));
    }

    private String nextOrderNumber() {
        return String.valueOf(orderRepository.findMaxNumericNumber() + 1);
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }

    private OffsetDateTime startOfDay(LocalDate date) {
        return date.atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime();
    }
}
