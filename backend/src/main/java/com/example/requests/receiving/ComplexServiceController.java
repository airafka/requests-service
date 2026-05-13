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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/complex-services")
public class ComplexServiceController {
    private final ComplexServiceRepository complexServiceRepository;
    private final BillingServiceRepository serviceRepository;

    public ComplexServiceController(
        ComplexServiceRepository complexServiceRepository,
        BillingServiceRepository serviceRepository
    ) {
        this.complexServiceRepository = complexServiceRepository;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<ComplexServiceResponse> list() {
        return complexServiceRepository.findAllByOrderByNameAsc().stream()
            .map(ComplexServiceResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ComplexServiceResponse create(@Valid @RequestBody CreateComplexServiceDto dto) {
        String name = dto.name().trim();
        if (complexServiceRepository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Complex service already exists");
        }

        ComplexService complexService = new ComplexService();
        fillComplexService(complexService, name, dto);
        return ComplexServiceResponse.fromEntity(complexServiceRepository.save(complexService));
    }

    @PutMapping("/{id}")
    public ComplexServiceResponse update(@PathVariable Long id, @Valid @RequestBody CreateComplexServiceDto dto) {
        ComplexService complexService = complexServiceRepository.findWithItemsById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complex service was not found"));

        String name = dto.name().trim();
        complexServiceRepository.findByNameIgnoreCase(name)
            .filter(existing -> !existing.getId().equals(id))
            .ifPresent(existing -> {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Complex service already exists");
            });

        fillComplexService(complexService, name, dto);
        return ComplexServiceResponse.fromEntity(complexServiceRepository.save(complexService));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!complexServiceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Complex service was not found");
        }

        try {
            complexServiceRepository.deleteById(id);
        } catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Complex service is used");
        }
    }

    private void fillComplexService(ComplexService complexService, String name, CreateComplexServiceDto dto) {
        List<ComplexServiceItem> items = buildItems(dto);
        complexService.setName(name);
        complexService.setCoefficient(dto.coefficient());
        complexService.setAmountPerContainer(amountPerContainer(items, dto.coefficient()));
        complexService.setItems(items);
    }

    private BigDecimal amountPerContainer(List<ComplexServiceItem> items, BigDecimal coefficient) {
        BigDecimal servicesAmount = items.stream()
            .map(this::itemAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        return servicesAmount.multiply(coefficient).setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal itemAmount(ComplexServiceItem item) {
        int quantity = item.getOperationCount() != null ? item.getOperationCount() : item.getDurationDays();
        return item.getService().getCost().multiply(BigDecimal.valueOf(quantity));
    }

    private List<ComplexServiceItem> buildItems(CreateComplexServiceDto dto) {
        LinkedHashSet<Long> serviceIds = dto.items().stream()
            .map(CreateComplexServiceDto.ComplexServiceItemDto::serviceId)
            .collect(Collectors.toCollection(LinkedHashSet::new));

        if (serviceIds.size() != dto.items().size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service cannot be selected twice");
        }

        Map<Long, BillingService> services = serviceRepository.findByIdIn(serviceIds).stream()
            .collect(Collectors.toMap(BillingService::getId, Function.identity()));

        if (services.size() != serviceIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown services");
        }

        List<ComplexServiceItem> items = new ArrayList<>();
        for (CreateComplexServiceDto.ComplexServiceItemDto dtoItem : dto.items()) {
            BillingService service = services.get(dtoItem.serviceId());
            ComplexServiceItem item = new ComplexServiceItem();
            item.setService(service);

            if (service.getServiceType() == BillingServiceType.ONE_TIME) {
                if (dtoItem.operationCount() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Operation count is required");
                }
                item.setOperationCount(dtoItem.operationCount());
                item.setDurationDays(null);
            } else {
                if (dtoItem.durationDays() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duration days is required");
                }
                item.setOperationCount(null);
                item.setDurationDays(dtoItem.durationDays());
            }

            items.add(item);
        }

        return items;
    }
}
