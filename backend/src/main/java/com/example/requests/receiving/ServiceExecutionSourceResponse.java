package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record ServiceExecutionSourceResponse(
    Long id,
    ServiceExecutionFactSourceType sourceType,
    Long sourceId,
    OffsetDateTime createdAt,
    TosOperationFactResponse tosOperationFact,
    ContainerStoragePeriodResponse storagePeriod
) {
    public static ServiceExecutionSourceResponse fromEntity(
        ServiceExecutionSource source,
        TosOperationFact tosOperationFact,
        ContainerStoragePeriod storagePeriod
    ) {
        return new ServiceExecutionSourceResponse(
            source.getId(),
            source.getSourceType(),
            source.getSourceId(),
            source.getCreatedAt(),
            tosOperationFact == null ? null : TosOperationFactResponse.fromEntity(tosOperationFact),
            storagePeriod == null ? null : ContainerStoragePeriodResponse.fromEntity(storagePeriod)
        );
    }
}
