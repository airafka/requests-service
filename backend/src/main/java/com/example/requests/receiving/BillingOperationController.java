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
@RequestMapping("/api/operations")
public class BillingOperationController {
    private final BillingOperationRepository repository;

    public BillingOperationController(BillingOperationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<BillingOperationResponse> list() {
        return repository.findAllByOrderByNameAsc().stream()
            .map(BillingOperationResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BillingOperationResponse create(@Valid @RequestBody CreateBillingOperationDto dto) {
        String name = dto.name().trim();
        if (repository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Operation already exists");
        }

        BillingOperation operation = new BillingOperation();
        operation.setName(name);
        return BillingOperationResponse.fromEntity(repository.save(operation));
    }
}
