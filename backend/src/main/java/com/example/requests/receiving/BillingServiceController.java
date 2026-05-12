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

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/services")
public class BillingServiceController {
    private final BillingServiceRepository serviceRepository;
    private final BillingOperationRepository operationRepository;

    public BillingServiceController(
        BillingServiceRepository serviceRepository,
        BillingOperationRepository operationRepository
    ) {
        this.serviceRepository = serviceRepository;
        this.operationRepository = operationRepository;
    }

    @GetMapping
    public List<BillingServiceResponse> list() {
        return serviceRepository.findAllByOrderByNameAsc().stream()
            .map(BillingServiceResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BillingServiceResponse create(@Valid @RequestBody CreateBillingServiceDto dto) {
        String name = dto.name().trim();
        if (serviceRepository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Service already exists");
        }

        Set<Long> operationIds = new LinkedHashSet<>(dto.operationIds());
        List<BillingOperation> operations = operationRepository.findByIdIn(operationIds);
        if (operations.size() != operationIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown billing operations");
        }

        BillingService service = new BillingService();
        fillService(service, name, dto, operations);
        return BillingServiceResponse.fromEntity(serviceRepository.save(service));
    }

    @PutMapping("/{id}")
    public BillingServiceResponse update(@PathVariable Long id, @Valid @RequestBody CreateBillingServiceDto dto) {
        BillingService service = serviceRepository.findWithOperationsById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service was not found"));

        String name = dto.name().trim();
        serviceRepository.findByNameIgnoreCase(name)
            .filter(existing -> !existing.getId().equals(id))
            .ifPresent(existing -> {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Service already exists");
            });

        Set<Long> operationIds = new LinkedHashSet<>(dto.operationIds());
        List<BillingOperation> operations = operationRepository.findByIdIn(operationIds);
        if (operations.size() != operationIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown billing operations");
        }

        fillService(service, name, dto, operations);
        return BillingServiceResponse.fromEntity(serviceRepository.save(service));
    }

    private void fillService(
        BillingService service,
        String name,
        CreateBillingServiceDto dto,
        List<BillingOperation> operations
    ) {
        service.setName(name);
        service.setServiceType(dto.serviceType());
        service.setDurationDays(durationDays(dto));
        service.setOperations(new LinkedHashSet<>(operations));
    }

    private Integer durationDays(CreateBillingServiceDto dto) {
        if (dto.serviceType() != BillingServiceType.CONTINUOUS) {
            return null;
        }

        if (dto.durationDays() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duration days is required");
        }

        return dto.durationDays();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service was not found");
        }

        try {
            serviceRepository.deleteById(id);
        } catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Service is used by tariffs");
        }
    }
}
