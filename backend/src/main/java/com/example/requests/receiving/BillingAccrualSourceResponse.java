package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record BillingAccrualSourceResponse(
    Long id,
    Long serviceExecutionId,
    OffsetDateTime createdAt,
    ServiceExecutionResponse serviceExecution
) {
    public static BillingAccrualSourceResponse fromEntity(BillingAccrualSource source) {
        return new BillingAccrualSourceResponse(
            source.getId(),
            source.getServiceExecution().getId(),
            source.getCreatedAt(),
            ServiceExecutionResponse.fromEntity(source.getServiceExecution())
        );
    }
}
