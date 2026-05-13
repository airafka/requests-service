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
import java.util.function.Function;
import java.util.stream.Collectors;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/receiving-orders")
public class ReceivingOrderController {
    private final ReceivingOrderRepository orderRepository;
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;
    private final ContainerOwnerService containerOwnerService;
    private final ComplexServiceRepository complexServiceRepository;
    private final BillingServiceExecutionRepository serviceExecutionRepository;

    public ReceivingOrderController(
        ReceivingOrderRepository orderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository,
        ContainerOwnerService containerOwnerService,
        ComplexServiceRepository complexServiceRepository,
        BillingServiceExecutionRepository serviceExecutionRepository
    ) {
        this.orderRepository = orderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
        this.containerOwnerService = containerOwnerService;
        this.complexServiceRepository = complexServiceRepository;
        this.serviceExecutionRepository = serviceExecutionRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<ReceivingOrderResponse> list() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(ReceivingOrderResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public ReceivingOrderResponse create(@Valid @RequestBody CreateReceivingOrderDto dto) {
        ClientEntity client = clientRepository.findById(dto.clientId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown client"));
        ComplexService complexService = complexServiceRepository.findWithItemsById(dto.complexServiceId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown complex service"));

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

        ReceivingOrder order = new ReceivingOrder();
        order.setNumber(nextOrderNumber());
        order.setClient(client);
        order.setComplexService(complexService);
        requestedNumbers.forEach(number -> order.addContainer(containersByNumber.get(normalize(number))));

        ReceivingOrder saved = orderRepository.saveAndFlush(order);
        return ReceivingOrderResponse.fromEntity(saved);
    }

    @PostMapping("/{id}/confirm")
    @Transactional
    public ReceivingOrderResponse confirm(@PathVariable Long id) {
        ReceivingOrder order = orderRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiving order was not found"));

        if (order.getStatus() != ReceivingOrderStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only draft receiving order can be confirmed");
        }

        order.setStatus(ReceivingOrderStatus.CONFIRMED);
        return ReceivingOrderResponse.fromEntity(orderRepository.save(order));
    }

    @PostMapping("/{orderId}/containers/{linkId}/services/{serviceId}/finish")
    @Transactional
    public ReceivingOrderResponse finishService(
        @PathVariable Long orderId,
        @PathVariable Long linkId,
        @PathVariable Long serviceId
    ) {
        ReceivingOrder order = orderRepository.findWithContainersById(orderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiving order was not found"));

        ReceivingOrderContainer link = order.getContainers().stream()
            .filter(currentLink -> currentLink.getId().equals(linkId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Container was not found in receiving order"));

        if (link.getStatus() != ReceivingOrderContainerStatus.FINISHED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Container must be accepted before services can be finished");
        }

        ComplexService complexService = order.getComplexService();
        if (complexService == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Receiving order has no complex service");
        }

        ComplexServiceItem item = complexService.getItems().stream()
            .filter(currentItem -> currentItem.getService().getId().equals(serviceId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service is not included in complex service"));

        if (item.getService().getServiceType() != BillingServiceType.ONE_TIME) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only one-time services can be finished in TOS");
        }

        int requiredQuantity = item.getOperationCount() == null ? 1 : item.getOperationCount();
        BillingServiceExecution execution = serviceExecutionRepository
            .findByReceivingOrderContainerIdAndServiceId(linkId, serviceId)
            .orElseGet(() -> {
                BillingServiceExecution newExecution = new BillingServiceExecution();
                newExecution.setReceivingOrder(order);
                newExecution.setReceivingOrderContainer(link);
                newExecution.setContainer(link.getContainer());
                newExecution.setComplexService(complexService);
                newExecution.setService(item.getService());
                newExecution.setQuantity(0);
                newExecution.setAmount(BigDecimal.ZERO);
                newExecution.setSource(BillingServiceExecutionSource.TOS);
                return newExecution;
            });

        if (execution.getQuantity() >= requiredQuantity) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Service is already fully finished");
        }

        int nextQuantity = execution.getQuantity() + 1;
        BigDecimal amount = item.getService().getCost()
            .multiply(BigDecimal.valueOf(nextQuantity))
            .multiply(complexService.getCoefficient())
            .setScale(2, RoundingMode.HALF_UP);

        execution.setQuantity(nextQuantity);
        execution.setAmount(amount);
        serviceExecutionRepository.saveAndFlush(execution);

        return ReceivingOrderResponse.fromEntity(orderRepository.findWithContainersById(orderId).orElse(order));
    }

    @PostMapping("/{orderId}/containers/{linkId}/finish")
    @Transactional
    public ReceivingOrderResponse finishContainer(@PathVariable Long orderId, @PathVariable Long linkId) {
        ReceivingOrder order = orderRepository.findWithContainersById(orderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiving order was not found"));

        if (order.getStatus() == ReceivingOrderStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only confirmed receiving order can be processed in TOS");
        }

        ReceivingOrderContainer link = order.getContainers().stream()
            .filter(currentLink -> currentLink.getId().equals(linkId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Container was not found in receiving order"));

        if (link.getStatus() != ReceivingOrderContainerStatus.FINISHED) {
            link.setStatus(ReceivingOrderContainerStatus.FINISHED);
            link.setFinishedAt(OffsetDateTime.now());
        }

        boolean allContainersFinished = order.getContainers().stream()
            .allMatch(currentLink -> currentLink.getStatus() == ReceivingOrderContainerStatus.FINISHED);

        if (allContainersFinished && order.getStatus() != ReceivingOrderStatus.COMPLETED) {
            order.setStatus(ReceivingOrderStatus.COMPLETED);
            containerOwnerService.createReceivingHistory(order);
        }

        return ReceivingOrderResponse.fromEntity(orderRepository.save(order));
    }

    private String nextOrderNumber() {
        return String.valueOf(orderRepository.findMaxNumericNumber() + 1);
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }
}
