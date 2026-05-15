package com.example.requests.receiving;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record BillingAccrualResponse(
    Long id,
    Long billingPeriodId,
    String billingPeriodName,
    Long clientId,
    String clientName,
    Long serviceId,
    String serviceName,
    Long tariffId,
    String tariffName,
    BigDecimal quantity,
    String unit,
    BigDecimal unitPrice,
    BigDecimal amount,
    BillingAccrualStatus status,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    List<BillingAccrualSourceResponse> sources
) {
    public static BillingAccrualResponse fromEntity(BillingAccrual accrual) {
        return fromEntity(accrual, null);
    }

    public static BillingAccrualResponse fromEntity(
        BillingAccrual accrual,
        List<BillingAccrualSourceResponse> sources
    ) {
        return new BillingAccrualResponse(
            accrual.getId(),
            accrual.getBillingPeriod().getId(),
            accrual.getBillingPeriod().getName(),
            accrual.getClient().getId(),
            accrual.getClient().getName(),
            accrual.getService() == null ? null : accrual.getService().getId(),
            accrual.getService() == null ? null : accrual.getService().getName(),
            accrual.getTariff() == null ? null : accrual.getTariff().getId(),
            accrual.getTariff() == null ? null : accrual.getTariff().getName(),
            accrual.getQuantity(),
            accrual.getUnit(),
            accrual.getUnitPrice(),
            accrual.getAmount(),
            accrual.getStatus(),
            accrual.getCreatedAt(),
            accrual.getUpdatedAt(),
            sources
        );
    }
}
