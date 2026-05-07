package com.example.requests.request;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusDto(@NotNull RequestStatus status) {
}
