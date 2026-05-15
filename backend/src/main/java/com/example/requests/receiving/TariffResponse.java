package com.example.requests.receiving;

import java.math.BigDecimal;

public record TariffResponse(
    Long id,
    String name,
    BigDecimal cost
) {
    public static TariffResponse fromEntity(Tariff tariff) {
        return new TariffResponse(tariff.getId(), tariff.getName(), tariff.getCost());
    }
}
