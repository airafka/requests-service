package com.example.requests.receiving;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record BillingServiceExecutionResponse(
    Long id,
    BillingServiceResponse service,
    Integer quantity,
    BigDecimal amount,
    BillingServiceExecutionSource source,
    OffsetDateTime performedAt
) {
    static BillingServiceExecutionResponse fromEntity(BillingServiceExecution execution) {
        return new BillingServiceExecutionResponse(
            execution.getId(),
            BillingServiceResponse.fromEntity(execution.getService()),
            execution.getQuantity(),
            execution.getAmount(),
            execution.getSource(),
            execution.getPerformedAt()
        );
    }
}
