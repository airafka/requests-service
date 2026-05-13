package com.example.requests.receiving;

import java.time.OffsetDateTime;
import java.util.List;

public record ShippingOrderResponse(
    Long id,
    String number,
    ClientResponse client,
    OffsetDateTime createdAt,
    ShippingOrderStatus status,
    OffsetDateTime completedAt,
    List<ShippingOrderContainerResponse> containers
) {
    static ShippingOrderResponse fromEntity(ShippingOrder order) {
        List<ShippingOrderContainerResponse> containers = order.getContainers().stream()
            .map(ShippingOrderContainerResponse::fromEntity)
            .toList();

        return new ShippingOrderResponse(
            order.getId(),
            order.getNumber(),
            ClientResponse.fromEntity(order.getClient()),
            order.getCreatedAt(),
            order.getStatus(),
            order.getCompletedAt(),
            containers
        );
    }
}
