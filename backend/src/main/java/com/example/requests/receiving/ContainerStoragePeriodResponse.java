package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public record ContainerStoragePeriodResponse(
    Long id,
    Long containerId,
    String containerNumber,
    Long clientId,
    String clientName,
    Long serviceId,
    String serviceName,
    Long ownerHistoryId,
    LocalDate dateFrom,
    LocalDate dateTo,
    Integer storageDays,
    ContainerStoragePeriodStatus status,
    ContainerStorageSourceType sourceType,
    Long sourceId,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static ContainerStoragePeriodResponse fromEntity(ContainerStoragePeriod period) {
        return new ContainerStoragePeriodResponse(
            period.getId(),
            period.getContainer().getId(),
            period.getContainerNumber(),
            period.getClient().getId(),
            period.getClient().getName(),
            period.getService() == null ? null : period.getService().getId(),
            period.getService() == null ? null : period.getService().getName(),
            period.getOwnerHistory() == null ? null : period.getOwnerHistory().getId(),
            period.getDateFrom(),
            period.getDateTo(),
            period.getStorageDays(),
            period.getStatus(),
            period.getSourceType(),
            period.getSourceId(),
            period.getCreatedAt(),
            period.getUpdatedAt()
        );
    }
}
