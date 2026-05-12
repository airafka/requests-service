package com.example.requests.receiving;

public record BillingOperationResponse(Long id, String name) {
    static BillingOperationResponse fromEntity(BillingOperation operation) {
        return new BillingOperationResponse(operation.getId(), operation.getName());
    }
}
