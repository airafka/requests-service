package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateBillingOperationDto(@NotBlank @Size(max = 180) String name) {
}
