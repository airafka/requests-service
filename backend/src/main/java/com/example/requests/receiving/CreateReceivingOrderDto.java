package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateReceivingOrderDto(
    @NotBlank @Size(max = 64) String number,
    @NotBlank @Size(max = 180) String client,
    @NotEmpty List<@NotBlank @Size(max = 32) String> containerNumbers
) {
}
