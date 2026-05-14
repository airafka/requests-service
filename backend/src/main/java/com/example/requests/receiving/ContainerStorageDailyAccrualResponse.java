package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public record ContainerStorageDailyAccrualResponse(
    Long id,
    Long storagePeriodId,
    Long containerId,
    String containerNumber,
    Long clientId,
    String clientName,
    LocalDate accrualDate,
    Long serviceId,
    String serviceName,
    Integer quantity,
    ContainerStorageDailyAccrualSource source,
    ContainerStorageDailyAccrualStatus status,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static ContainerStorageDailyAccrualResponse fromEntity(ContainerStorageDailyAccrual accrual) {
        return new ContainerStorageDailyAccrualResponse(
            accrual.getId(),
            accrual.getStoragePeriod().getId(),
            accrual.getContainer().getId(),
            accrual.getContainerNumber(),
            accrual.getClient().getId(),
            accrual.getClient().getName(),
            accrual.getAccrualDate(),
            accrual.getService() == null ? null : accrual.getService().getId(),
            accrual.getService() == null ? null : accrual.getService().getName(),
            accrual.getQuantity(),
            accrual.getSource(),
            accrual.getStatus(),
            accrual.getCreatedAt(),
            accrual.getUpdatedAt()
        );
    }
}
