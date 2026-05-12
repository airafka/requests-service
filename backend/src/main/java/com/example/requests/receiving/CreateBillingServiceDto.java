package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

public record CreateBillingServiceDto(
    @NotBlank @Size(max = 180) String name,
    @NotNull BillingServiceType serviceType,
    @NotNull @DecimalMin("0.00") BigDecimal cost,
    @NotEmpty List<Long> operationIds
) {
}
