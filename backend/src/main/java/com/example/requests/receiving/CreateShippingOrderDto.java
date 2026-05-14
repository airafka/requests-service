package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record CreateShippingOrderDto(
    @NotNull Long clientId,
    @NotNull LocalDate plannedShippingDate,
    @NotEmpty List<@NotBlank @Size(max = 32) String> containerNumbers
) {
}
