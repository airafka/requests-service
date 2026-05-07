package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/containers")
public class ContainerController {
    private final ContainerRepository repository;

    public ContainerController(ContainerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ContainerResponse> list() {
        return repository.findAllByOrderByNumberAsc().stream()
            .map(ContainerResponse::fromEntity)
            .toList();
    }

    @GetMapping("/available-for-receiving")
    public List<ContainerResponse> availableForReceiving() {
        return repository.findAvailableForReceiving().stream()
            .map(ContainerResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContainerResponse create(@Valid @RequestBody CreateContainerDto dto) {
        String number = normalize(dto.number());
        if (repository.existsByNumberIgnoreCase(number)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Container already exists");
        }

        ContainerEntity container = new ContainerEntity();
        container.setNumber(number);
        return ContainerResponse.fromEntity(repository.save(container));
    }

    private String normalize(String value) {
        return value.trim().toUpperCase();
    }
}
