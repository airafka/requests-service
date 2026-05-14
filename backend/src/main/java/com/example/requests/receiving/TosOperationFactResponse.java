package com.example.requests.receiving;

import com.fasterxml.jackson.databind.JsonNode;

import java.time.OffsetDateTime;

public record TosOperationFactResponse(
    Long id,
    String externalId,
    Long operationId,
    String operationName,
    String operationCode,
    Long containerId,
    String containerNumber,
    Long receivingOrderId,
    Long shippingOrderId,
    OffsetDateTime operationTime,
    Integer quantity,
    TosOperationFactStatus status,
    String sourceSystem,
    JsonNode rawPayload,
    String errorMessage,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static TosOperationFactResponse fromEntity(TosOperationFact fact) {
        return new TosOperationFactResponse(
            fact.getId(),
            fact.getExternalId(),
            fact.getOperation() == null ? null : fact.getOperation().getId(),
            fact.getOperation() == null ? null : fact.getOperation().getName(),
            fact.getOperationCode(),
            fact.getContainer() == null ? null : fact.getContainer().getId(),
            fact.getContainerNumber(),
            fact.getReceivingOrder() == null ? null : fact.getReceivingOrder().getId(),
            fact.getShippingOrder() == null ? null : fact.getShippingOrder().getId(),
            fact.getOperationTime(),
            fact.getQuantity(),
            fact.getStatus(),
            fact.getSourceSystem(),
            fact.getRawPayload(),
            fact.getErrorMessage(),
            fact.getCreatedAt(),
            fact.getUpdatedAt()
        );
    }
}
