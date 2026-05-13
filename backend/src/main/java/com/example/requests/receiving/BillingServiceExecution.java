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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(
    name = "billing_service_execution",
    uniqueConstraints = @UniqueConstraint(columnNames = {"receiving_order_container_id", "service_id"})
)
public class BillingServiceExecution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiving_order_id", nullable = false)
    private ReceivingOrder receivingOrder;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiving_order_container_id", nullable = false)
    private ReceivingOrderContainer receivingOrderContainer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "complex_service_id", nullable = false)
    private ComplexService complexService;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private BillingService service;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private BillingServiceExecutionSource source = BillingServiceExecutionSource.TOS;

    @Column(nullable = false)
    private OffsetDateTime performedAt;

    @PrePersist
    void onCreate() {
        performedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ReceivingOrder getReceivingOrder() {
        return receivingOrder;
    }

    public void setReceivingOrder(ReceivingOrder receivingOrder) {
        this.receivingOrder = receivingOrder;
    }

    public ReceivingOrderContainer getReceivingOrderContainer() {
        return receivingOrderContainer;
    }

    public void setReceivingOrderContainer(ReceivingOrderContainer receivingOrderContainer) {
        this.receivingOrderContainer = receivingOrderContainer;
    }

    public ContainerEntity getContainer() {
        return container;
    }

    public void setContainer(ContainerEntity container) {
        this.container = container;
    }

    public ComplexService getComplexService() {
        return complexService;
    }

    public void setComplexService(ComplexService complexService) {
        this.complexService = complexService;
    }

    public BillingService getService() {
        return service;
    }

    public void setService(BillingService service) {
        this.service = service;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BillingServiceExecutionSource getSource() {
        return source;
    }

    public void setSource(BillingServiceExecutionSource source) {
        this.source = source;
    }

    public OffsetDateTime getPerformedAt() {
        return performedAt;
    }
}
