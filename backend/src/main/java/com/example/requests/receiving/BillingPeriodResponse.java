package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record BillingPeriodResponse(
    Long id,
    String name,
    LocalDate dateFrom,
    LocalDate dateTo,
    Long clientId,
    String clientName,
    BillingPeriodStatus status,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    List<BillingAccrualResponse> accruals
) {
    public static BillingPeriodResponse fromEntity(BillingPeriod period) {
        return fromEntity(period, null);
    }

    public static BillingPeriodResponse fromEntity(BillingPeriod period, List<BillingAccrualResponse> accruals) {
        return new BillingPeriodResponse(
            period.getId(),
            period.getName(),
            period.getDateFrom(),
            period.getDateTo(),
            period.getClient() == null ? null : period.getClient().getId(),
            period.getClient() == null ? null : period.getClient().getName(),
            period.getStatus(),
            period.getCreatedAt(),
            period.getUpdatedAt(),
            accruals
        );
    }
}
