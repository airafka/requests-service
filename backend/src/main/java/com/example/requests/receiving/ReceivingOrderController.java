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

    public ReceivingOrderController(ReceivingOrderRepository orderRepository, ContainerRepository containerRepository) {
        this.orderRepository = orderRepository;
        this.containerRepository = containerRepository;
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
        String orderNumber = normalize(dto.number());
        if (orderRepository.existsByNumberIgnoreCase(orderNumber)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Receiving order already exists");
        }

        List<String> requestedNumbers = dto.containerNumbers().stream()
            .map(this::normalize)
            .filter(number -> !number.isBlank())
            .collect(Collectors.collectingAndThen(Collectors.toCollection(LinkedHashSet::new), List::copyOf));

        List<ContainerEntity> containers = containerRepository.findByNumberIn(requestedNumbers);
        Map<String, ContainerEntity> containersByNumber = containers.stream()
            .collect(Collectors.toMap(container -> container.getNumber().toUpperCase(), Function.identity()));

        List<String> missing = requestedNumbers.stream()
            .filter(number -> !containersByNumber.containsKey(number.toUpperCase()))
            .toList();

        if (!missing.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown containers: " + String.join(", ", missing));
        }

        ReceivingOrder order = new ReceivingOrder();
        order.setNumber(orderNumber);
        order.setClient(dto.client().trim());
        requestedNumbers.forEach(number -> order.addContainer(containersByNumber.get(number.toUpperCase())));

        return ReceivingOrderResponse.fromEntity(orderRepository.save(order));
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }
}
