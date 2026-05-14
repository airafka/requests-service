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
@Table(name = "container_storage_period")
public class ContainerStoragePeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    @Column(nullable = false, length = 32)
    private String containerNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private ClientEntity client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private BillingService service;

    @Column(nullable = false)
    private LocalDate dateFrom;

    private LocalDate dateTo;

    @Column(nullable = false)
    private Integer storageDays = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ContainerStoragePeriodStatus status = ContainerStoragePeriodStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 64)
    private ContainerStorageSourceType sourceType;

    private Long sourceId;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    void onCreate() {
        OffsetDateTime now = OffsetDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (storageDays == null) {
            storageDays = 0;
        }
        if (status == null) {
            status = ContainerStoragePeriodStatus.ACTIVE;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
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

    public BillingService getService() {
        return service;
    }

    public void setService(BillingService service) {
        this.service = service;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public Integer getStorageDays() {
        return storageDays;
    }

    public void setStorageDays(Integer storageDays) {
        this.storageDays = storageDays;
    }

    public ContainerStoragePeriodStatus getStatus() {
        return status;
    }

    public void setStatus(ContainerStoragePeriodStatus status) {
        this.status = status;
    }

    public ContainerStorageSourceType getSourceType() {
        return sourceType;
    }

    public void setSourceType(ContainerStorageSourceType sourceType) {
        this.sourceType = sourceType;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
