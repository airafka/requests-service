package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record ContainerOwnerResponse(
    Long containerId,
    ClientResponse client,
    OffsetDateTime validFrom,
    ContainerOwnerOperationType operationType,
    Long sourceId
) {
    static ContainerOwnerResponse fromEntity(ContainerOwnerHistory history) {
        return new ContainerOwnerResponse(
            history.getContainer().getId(),
            ClientResponse.fromEntity(history.getClient()),
            history.getValidFrom(),
            history.getOperationType(),
            history.getSourceId()
        );
    }
}
