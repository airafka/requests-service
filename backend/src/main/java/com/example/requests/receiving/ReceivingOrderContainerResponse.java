package com.example.requests.receiving;

import java.time.OffsetDateTime;
import java.util.List;

public record ReceivingOrderContainerResponse(
    Long id,
    ReceivingOrderContainerStatus status,
    OffsetDateTime finishedAt,
    ContainerResponse container,
    List<BillingServiceExecutionResponse> serviceExecutions
) {
    static ReceivingOrderContainerResponse fromEntity(ReceivingOrderContainer link) {
        return new ReceivingOrderContainerResponse(
            link.getId(),
            link.getStatus(),
            link.getFinishedAt(),
            ContainerResponse.fromEntity(link.getContainer()),
            link.getServiceExecutions().stream()
                .map(BillingServiceExecutionResponse::fromEntity)
                .toList()
        );
    }
}
