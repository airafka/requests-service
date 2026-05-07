package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
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

@RestController
@RequestMapping("/api/receiving-orders")
public class ReceivingOrderController {
    private final ReceivingOrderRepository orderRepository;
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;
    private final ContainerOwnerService containerOwnerService;

    public ReceivingOrderController(
        ReceivingOrderRepository orderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository,
        ContainerOwnerService containerOwnerService
    ) {
        this.orderRepository = orderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
        this.containerOwnerService = containerOwnerService;
    }

    @GetMapping
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
        requestedNumbers.forEach(number -> order.addContainer(containersByNumber.get(normalize(number))));

        ReceivingOrder saved = orderRepository.saveAndFlush(order);
        containerOwnerService.createReceivingHistory(saved);
        return ReceivingOrderResponse.fromEntity(saved);
    }

    private String nextOrderNumber() {
        return "RO-" + (System.currentTimeMillis() % 1_000_000_000L);
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }
}
