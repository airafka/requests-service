package com.example.requests.receiving;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateBillingPeriodDto(
    @Size(max = 180) String name,
    @NotNull LocalDate dateFrom,
    @NotNull LocalDate dateTo
) {
}

