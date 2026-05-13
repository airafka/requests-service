package com.example.requests.receiving;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

public record ComplexServiceResponse(
    Long id,
    String name,
    BigDecimal coefficient,
    BigDecimal amountPerContainer,
    List<ComplexServiceItemResponse> items
) {
    static ComplexServiceResponse fromEntity(ComplexService complexService) {
        List<ComplexServiceItemResponse> items = complexService.getItems().stream()
            .sorted(Comparator.comparing(item -> item.getService().getName()))
            .map(ComplexServiceItemResponse::fromEntity)
            .toList();

        return new ComplexServiceResponse(
            complexService.getId(),
            complexService.getName(),
            complexService.getCoefficient(),
            complexService.getAmountPerContainer(),
            items
        );
    }

    public record ComplexServiceItemResponse(
        Long id,
        BillingServiceResponse service,
        Integer operationCount,
        Integer durationDays
    ) {
        static ComplexServiceItemResponse fromEntity(ComplexServiceItem item) {
            return new ComplexServiceItemResponse(
                item.getId(),
                BillingServiceResponse.fromEntity(item.getService()),
                item.getOperationCount(),
                item.getDurationDays()
            );
        }
    }
}
