package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record ServiceExecutionSourceResponse(
    Long id,
    ServiceExecutionFactSourceType sourceType,
    Long sourceId,
    OffsetDateTime createdAt,
    TosOperationFactResponse tosOperationFact,
    ContainerStorageDailyAccrualResponse storageDailyAccrual
) {
    public static ServiceExecutionSourceResponse fromEntity(
        ServiceExecutionSource source,
        TosOperationFact tosOperationFact,
        ContainerStorageDailyAccrual storageDailyAccrual
    ) {
        return new ServiceExecutionSourceResponse(
            source.getId(),
            source.getSourceType(),
            source.getSourceId(),
            source.getCreatedAt(),
            tosOperationFact == null ? null : TosOperationFactResponse.fromEntity(tosOperationFact),
            storageDailyAccrual == null ? null : ContainerStorageDailyAccrualResponse.fromEntity(storageDailyAccrual)
        );
    }
}
