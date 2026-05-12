package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{id}")
    public BillingOperationResponse update(@PathVariable Long id, @Valid @RequestBody CreateBillingOperationDto dto) {
        BillingOperation operation = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Operation was not found"));

        String name = dto.name().trim();
        repository.findByNameIgnoreCase(name)
            .filter(existing -> !existing.getId().equals(id))
            .ifPresent(existing -> {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Operation already exists");
            });

        operation.setName(name);
        return BillingOperationResponse.fromEntity(repository.save(operation));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Operation was not found");
        }

        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Operation is used by services");
        }
    }
}
