package com.example.requests.receiving;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
    name = "service_execution",
    uniqueConstraints = @UniqueConstraint(columnNames = {"source_type", "basis_type", "basis_id", "service_id", "container_id"})
)
public class ServiceExecution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private ClientEntity client;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    @Column(nullable = false, length = 32)
    private String containerNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private BillingService service;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ServiceExecutionType executionType;

    @Column(nullable = false)
    private LocalDate dateFrom;

    private LocalDate dateTo;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(nullable = false, length = 64)
    private String unit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ServiceExecutionStatus status = ServiceExecutionStatus.CONFIRMED;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ServiceExecutionSourceType sourceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 64)
    private ServiceExecutionBasisType basisType;

    private Long basisId;

    private String errorMessage;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "serviceExecution", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ServiceExecutionSource> sources = new ArrayList<>();

    @PrePersist
    void onCreate() {
        OffsetDateTime now = OffsetDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (quantity == null) {
            quantity = 1;
        }
        if (status == null) {
            status = ServiceExecutionStatus.CONFIRMED;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
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

    public BillingService getService() {
        return service;
    }

    public void setService(BillingService service) {
        this.service = service;
    }

    public ServiceExecutionType getExecutionType() {
        return executionType;
    }

    public void setExecutionType(ServiceExecutionType executionType) {
        this.executionType = executionType;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public ServiceExecutionStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceExecutionStatus status) {
        this.status = status;
    }

    public ServiceExecutionSourceType getSourceType() {
        return sourceType;
    }

    public void setSourceType(ServiceExecutionSourceType sourceType) {
        this.sourceType = sourceType;
    }

    public ServiceExecutionBasisType getBasisType() {
        return basisType;
    }

    public void setBasisType(ServiceExecutionBasisType basisType) {
        this.basisType = basisType;
    }

    public Long getBasisId() {
        return basisId;
    }

    public void setBasisId(Long basisId) {
        this.basisId = basisId;
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

    public List<ServiceExecutionSource> getSources() {
        return sources;
    }
}
