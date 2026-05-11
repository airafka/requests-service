package com.example.requests.receiving;

import java.time.OffsetDateTime;
import java.util.List;

public record ShippingOrderResponse(
    Long id,
    String number,
    ClientResponse client,
    OffsetDateTime createdAt,
    List<ContainerResponse> containers
) {
    static ShippingOrderResponse fromEntity(ShippingOrder order) {
        List<ContainerResponse> containers = order.getContainers().stream()
            .map(link -> ContainerResponse.fromEntity(link.getContainer()))
            .toList();

        return new ShippingOrderResponse(
            order.getId(),
            order.getNumber(),
            ClientResponse.fromEntity(order.getClient()),
            order.getCreatedAt(),
            containers
        );
    }
}
