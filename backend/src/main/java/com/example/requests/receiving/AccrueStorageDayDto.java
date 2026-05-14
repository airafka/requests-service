package com.example.requests.receiving;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AccrueStorageDayDto(@NotNull LocalDate date) {
}
