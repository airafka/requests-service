package com.example.requests.receiving;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateComplexServiceDto(
    @NotBlank @Size(max = 180) String name,
    @NotEmpty List<@Valid ComplexServiceItemDto> items
) {
    public record ComplexServiceItemDto(
        @NotNull Long serviceId,
        @Positive Integer operationCount,
        @Positive Integer durationDays
    ) {
    }
}
