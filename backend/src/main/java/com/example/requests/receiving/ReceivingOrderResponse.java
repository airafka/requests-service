package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record ReceivingOrderResponse(
    Long id,
    String number,
    ClientResponse client,
    ComplexServiceResponse complexService,
    OffsetDateTime createdAt,
    LocalDate receivingDate,
    ReceivingOrderStatus status,
    List<ReceivingOrderContainerResponse> containers
) {
    static ReceivingOrderResponse fromEntity(ReceivingOrder order) {
        List<ReceivingOrderContainerResponse> containers = order.getContainers().stream()
            .map(ReceivingOrderContainerResponse::fromEntity)
            .toList();

        return new ReceivingOrderResponse(
            order.getId(),
            order.getNumber(),
            ClientResponse.fromEntity(order.getClient()),
            order.getComplexService() == null ? null : ComplexServiceResponse.fromEntity(order.getComplexService()),
            order.getCreatedAt(),
            order.getReceivingDate(),
            order.getStatus(),
            containers
        );
    }
}
