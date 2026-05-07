package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/container-owner-change-orders")
public class ContainerOwnerChangeOrderController {
    private final ContainerOwnerChangeOrderRepository repository;
    private final ContainerOwnerService service;

    public ContainerOwnerChangeOrderController(
        ContainerOwnerChangeOrderRepository repository,
        ContainerOwnerService service
    ) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    public List<ContainerOwnerChangeOrderResponse> list() {
        return repository.findAllByOrderByCreatedAtDesc().stream()
            .map(ContainerOwnerChangeOrderResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    public ContainerOwnerChangeOrderResponse details(@PathVariable Long id) {
        return repository.findWithContainersById(id)
            .map(ContainerOwnerChangeOrderResponse::fromEntity)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner change order was not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContainerOwnerChangeOrderResponse create(@Valid @RequestBody CreateContainerOwnerChangeOrderDto dto) {
        return ContainerOwnerChangeOrderResponse.fromEntity(service.createChangeOrder(dto));
    }

    @PostMapping("/{id}/complete")
    public ContainerOwnerChangeOrderResponse complete(@PathVariable Long id) {
        return ContainerOwnerChangeOrderResponse.fromEntity(service.completeChangeOrder(id));
    }

    @PostMapping("/{id}/cancel")
    public ContainerOwnerChangeOrderResponse cancel(@PathVariable Long id) {
        return ContainerOwnerChangeOrderResponse.fromEntity(service.cancelChangeOrder(id));
    }
}
