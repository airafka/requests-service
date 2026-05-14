package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record ContainerOwnerChangeOrderResponse(
    Long id,
    String number,
    BillingServiceResponse service,
    LocalDate serviceDate,
    ClientResponse newClient,
    String comment,
    OffsetDateTime createdAt,
    String createdBy,
    OffsetDateTime completedAt,
    String completedBy,
    List<ContainerResponse> containers
) {
    static ContainerOwnerChangeOrderResponse fromEntity(ContainerOwnerChangeOrder order) {
        List<ContainerResponse> containers = order.getContainers().stream()
            .map(link -> ContainerResponse.fromEntity(link.getContainer()))
            .toList();

        return new ContainerOwnerChangeOrderResponse(
            order.getId(),
            order.getNumber(),
            BillingServiceResponse.fromEntity(order.getService()),
            order.getServiceDate(),
            ClientResponse.fromEntity(order.getNewClient()),
            order.getComment(),
            order.getCreatedAt(),
            order.getCreatedBy(),
            order.getCompletedAt(),
            order.getCompletedBy(),
            containers
        );
    }
}
