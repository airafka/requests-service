package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record ContainerOwnerHistoryResponse(
    Long containerId,
    ClientResponse client,
    ContainerOwnerOperationType operationType,
    Long sourceId,
    Long sourceOrderId,
    String sourceNumber,
    String sourceLabel,
    OffsetDateTime validFrom,
    OffsetDateTime validTo,
    OffsetDateTime createdAt,
    String createdBy
) {
}
