package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record CurrentContainerOwnerResponse(
    ContainerResponse container,
    ClientResponse client,
    OffsetDateTime validFrom,
    ContainerOwnerOperationType operationType,
    Long sourceId,
    Integer storageDays
) {
    static CurrentContainerOwnerResponse fromEntity(ContainerOwnerHistory history) {
        return new CurrentContainerOwnerResponse(
            ContainerResponse.fromEntity(history.getContainer()),
            ClientResponse.fromEntity(history.getClient()),
            history.getValidFrom(),
            history.getOperationType(),
            history.getSourceId(),
            history.getStorageDays()
        );
    }
}
