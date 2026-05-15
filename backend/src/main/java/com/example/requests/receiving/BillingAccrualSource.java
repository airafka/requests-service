package com.example.requests.receiving;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.OffsetDateTime;

@Entity
@Table(
    name = "billing_accrual_source",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"billing_accrual_id", "service_execution_id"}),
        @UniqueConstraint(columnNames = {"billing_period_id", "service_execution_id"})
    }
)
public class BillingAccrualSource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "billing_accrual_id", nullable = false)
    private BillingAccrual billingAccrual;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "billing_period_id", nullable = false)
    private BillingPeriod billingPeriod;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_execution_id", nullable = false)
    private ServiceExecution serviceExecution;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public BillingAccrual getBillingAccrual() {
        return billingAccrual;
    }

    public void setBillingAccrual(BillingAccrual billingAccrual) {
        this.billingAccrual = billingAccrual;
    }

    public BillingPeriod getBillingPeriod() {
        return billingPeriod;
    }

    public void setBillingPeriod(BillingPeriod billingPeriod) {
        this.billingPeriod = billingPeriod;
    }

    public ServiceExecution getServiceExecution() {
        return serviceExecution;
    }

    public void setServiceExecution(ServiceExecution serviceExecution) {
        this.serviceExecution = serviceExecution;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}

