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

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "container_storage_daily_accrual")
public class ContainerStorageDailyAccrual {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "storage_period_id", nullable = false)
    private ContainerStoragePeriod storagePeriod;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    @Column(nullable = false, length = 32)
    private String containerNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private ClientEntity client;

    @Column(nullable = false)
    private LocalDate accrualDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private BillingService service;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ContainerStorageDailyAccrualSource source = ContainerStorageDailyAccrualSource.SYSTEM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ContainerStorageDailyAccrualStatus status = ContainerStorageDailyAccrualStatus.ACCRUED;

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
        if (source == null) {
            source = ContainerStorageDailyAccrualSource.SYSTEM;
        }
        if (status == null) {
            status = ContainerStorageDailyAccrualStatus.ACCRUED;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ContainerStoragePeriod getStoragePeriod() {
        return storagePeriod;
    }

    public void setStoragePeriod(ContainerStoragePeriod storagePeriod) {
        this.storagePeriod = storagePeriod;
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

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public LocalDate getAccrualDate() {
        return accrualDate;
    }

    public void setAccrualDate(LocalDate accrualDate) {
        this.accrualDate = accrualDate;
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

    public ContainerStorageDailyAccrualSource getSource() {
        return source;
    }

    public void setSource(ContainerStorageDailyAccrualSource source) {
        this.source = source;
    }

    public ContainerStorageDailyAccrualStatus getStatus() {
        return status;
    }

    public void setStatus(ContainerStorageDailyAccrualStatus status) {
        this.status = status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
