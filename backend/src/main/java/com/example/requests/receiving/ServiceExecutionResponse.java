package com.example.requests.receiving;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record ServiceExecutionResponse(
    Long id,
    Long clientId,
    String clientName,
    Long containerId,
    String containerNumber,
    Long serviceId,
    String serviceName,
    ServiceExecutionType executionType,
    LocalDate dateFrom,
    LocalDate dateTo,
    Integer quantity,
    String unit,
    ServiceExecutionSourceType sourceType,
    ServiceExecutionBasisType basisType,
    Long basisId,
    ServiceExecutionStatus status,
    String errorMessage,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    List<ServiceExecutionSourceResponse> sources
) {
    public static ServiceExecutionResponse fromEntity(ServiceExecution execution) {
        return fromEntity(execution, null);
    }

    public static ServiceExecutionResponse fromEntity(
        ServiceExecution execution,
        List<ServiceExecutionSourceResponse> sources
    ) {
        return new ServiceExecutionResponse(
            execution.getId(),
            execution.getClient().getId(),
            execution.getClient().getName(),
            execution.getContainer().getId(),
            execution.getContainerNumber(),
            execution.getService().getId(),
            execution.getService().getName(),
            execution.getExecutionType(),
            execution.getDateFrom(),
            execution.getDateTo(),
            execution.getQuantity(),
            execution.getUnit(),
            execution.getSourceType(),
            execution.getBasisType(),
            execution.getBasisId(),
            execution.getStatus(),
            execution.getErrorMessage(),
            execution.getCreatedAt(),
            execution.getUpdatedAt(),
            sources
        );
    }
}
