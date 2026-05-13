package com.example.requests.receiving;

import java.time.OffsetDateTime;
import java.util.List;

public record ReceivingOrderResponse(
    Long id,
    String number,
    ClientResponse client,
    OffsetDateTime createdAt,
    ReceivingOrderStatus status,
    List<ContainerResponse> containers
) {
    static ReceivingOrderResponse fromEntity(ReceivingOrder order) {
        List<ContainerResponse> containers = order.getContainers().stream()
            .map(link -> ContainerResponse.fromEntity(link.getContainer()))
            .toList();

        return new ReceivingOrderResponse(
            order.getId(),
            order.getNumber(),
            ClientResponse.fromEntity(order.getClient()),
            order.getCreatedAt(),
            order.getStatus(),
            containers
        );
    }
}
