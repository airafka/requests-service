package com.example.requests.receiving;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

public record BillingTariffResponse(
    Long id,
    String name,
    List<BillingServiceResponse> services,
    BigDecimal cost
) {
    static BillingTariffResponse fromEntity(BillingTariff tariff) {
        List<BillingServiceResponse> services = tariff.getServices().stream()
            .sorted(Comparator.comparing(BillingService::getName))
            .map(BillingServiceResponse::fromEntity)
            .toList();

        return new BillingTariffResponse(
            tariff.getId(),
            tariff.getName(),
            services,
            tariff.getCost()
        );
    }
}
