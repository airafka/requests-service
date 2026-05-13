package com.example.requests.receiving;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateStorageDaysDto(@NotNull @Min(0) Integer storageDays) {
}
