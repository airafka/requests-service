package com.example.requests.receiving;

import java.util.Comparator;
import java.util.List;

public record BillingServiceResponse(
    Long id,
    String name,
    BillingServiceType serviceType,
    List<BillingOperationResponse> operations
) {
    static BillingServiceResponse fromEntity(BillingService service) {
        List<BillingOperationResponse> operations = service.getOperations().stream()
            .sorted(Comparator.comparing(BillingOperation::getName))
            .map(BillingOperationResponse::fromEntity)
            .toList();

        return new BillingServiceResponse(
            service.getId(),
            service.getName(),
            service.getServiceType(),
            operations
        );
    }
}
