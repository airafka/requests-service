package com.example.requests.receiving;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import com.fasterxml.jackson.databind.JsonNode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;

@Entity
@Table(name = "tos_operation_fact")
public class TosOperationFact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String externalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operation_id")
    private BillingOperation operation;

    @Column(nullable = false, length = 180)
    private String operationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "container_id")
    private ContainerEntity container;

    @Column(nullable = false, length = 32)
    private String containerNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiving_order_id")
    private ReceivingOrder receivingOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_order_id")
    private ShippingOrder shippingOrder;

    @Column(nullable = false)
    private OffsetDateTime operationTime;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private TosOperationFactStatus status = TosOperationFactStatus.RECEIVED;

    @Column(nullable = false, length = 64)
    private String sourceSystem = "TOS";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private JsonNode rawPayload;

    private String errorMessage;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    void onCreate() {
        OffsetDateTime now = OffsetDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (quantity == null) {
            quantity = 1;
        }
        if (status == null) {
            status = TosOperationFactStatus.RECEIVED;
        }
        if (sourceSystem == null || sourceSystem.isBlank()) {
            sourceSystem = "TOS";
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public BillingOperation getOperation() {
        return operation;
    }

    public void setOperation(BillingOperation operation) {
        this.operation = operation;
    }

    public String getOperationCode() {
        return operationCode;
    }

    public void setOperationCode(String operationCode) {
        this.operationCode = operationCode;
    }

    public ContainerEntity getContainer() {
        return container;
    }

    public void setContainer(ContainerEntity container) {
        this.container = container;
    }

    public String getContainerNumber() {
        return containerNumber;
    }

    public void setContainerNumber(String containerNumber) {
        this.containerNumber = containerNumber;
    }

    public ReceivingOrder getReceivingOrder() {
        return receivingOrder;
    }

    public void setReceivingOrder(ReceivingOrder receivingOrder) {
        this.receivingOrder = receivingOrder;
    }

    public ShippingOrder getShippingOrder() {
        return shippingOrder;
    }

    public void setShippingOrder(ShippingOrder shippingOrder) {
        this.shippingOrder = shippingOrder;
    }

    public OffsetDateTime getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(OffsetDateTime operationTime) {
        this.operationTime = operationTime;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public TosOperationFactStatus getStatus() {
        return status;
    }

    public void setStatus(TosOperationFactStatus status) {
        this.status = status;
    }

    public String getSourceSystem() {
        return sourceSystem;
    }

    public void setSourceSystem(String sourceSystem) {
        this.sourceSystem = sourceSystem;
    }

    public JsonNode getRawPayload() {
        return rawPayload;
    }

    public void setRawPayload(JsonNode rawPayload) {
        this.rawPayload = rawPayload;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
