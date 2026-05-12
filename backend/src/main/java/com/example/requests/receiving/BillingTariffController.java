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

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/tariffs")
public class BillingTariffController {
    private final BillingTariffRepository tariffRepository;
    private final BillingServiceRepository serviceRepository;

    public BillingTariffController(
        BillingTariffRepository tariffRepository,
        BillingServiceRepository serviceRepository
    ) {
        this.tariffRepository = tariffRepository;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<BillingTariffResponse> list() {
        return tariffRepository.findAllByOrderByNameAsc().stream()
            .map(BillingTariffResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BillingTariffResponse create(@Valid @RequestBody CreateBillingTariffDto dto) {
        String name = dto.name().trim();
        if (tariffRepository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Tariff already exists");
        }

        Set<Long> serviceIds = new LinkedHashSet<>(dto.serviceIds());
        List<BillingService> services = serviceRepository.findByIdIn(serviceIds);
        if (services.size() != serviceIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown services");
        }

        BillingTariff tariff = new BillingTariff();
        tariff.setName(name);
        tariff.setCost(dto.cost());
        tariff.setServices(new LinkedHashSet<>(services));
        return BillingTariffResponse.fromEntity(tariffRepository.save(tariff));
    }
}
