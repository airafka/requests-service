package com.example.requests.receiving;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import com.fasterxml.jackson.databind.JsonNode;

import java.time.OffsetDateTime;

public record CreateTosOperationFactDto(
    String externalId,
    @NotBlank String operationCode,
    @NotBlank String containerNumber,
    Long receivingOrderId,
    Long shippingOrderId,
    @NotNull OffsetDateTime operationTime,
    @Positive Integer quantity,
    TosOperationFactStatus status,
    String sourceSystem,
    JsonNode rawPayload,
    String errorMessage
) {
}
