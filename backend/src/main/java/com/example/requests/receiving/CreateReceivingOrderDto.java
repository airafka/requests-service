package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record CreateReceivingOrderDto(
    @NotNull Long clientId,
    @NotNull Long complexServiceId,
    @NotNull LocalDate plannedReceivingDate,
    @NotEmpty List<@NotBlank @Size(max = 32) String> containerNumbers
) {
}
