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

@RestController
@RequestMapping("/api/receiving-orders")
public class ReceivingOrderController {
    private final ReceivingOrderRepository orderRepository;
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;

    public ReceivingOrderController(
        ReceivingOrderRepository orderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository
    ) {
        this.orderRepository = orderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
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

    private String nextOrderNumber() {
        return String.valueOf(orderRepository.findMaxNumericNumber() + 1);
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }
}
