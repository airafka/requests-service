package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateContainerDto(@NotBlank @Size(max = 32) String number) {
}
