package com.example.requests.receiving;

import java.time.OffsetDateTime;

public record ShippingOrderContainerResponse(
    Long id,
    ShippingOrderContainerStatus status,
    OffsetDateTime finishedAt,
    ContainerResponse container
) {
    static ShippingOrderContainerResponse fromEntity(ShippingOrderContainer link) {
        return new ShippingOrderContainerResponse(
            link.getId(),
            link.getStatus(),
            link.getFinishedAt(),
            ContainerResponse.fromEntity(link.getContainer())
        );
    }
}
