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

import java.time.OffsetDateTime;

@Entity
@Table(
    name = "service_execution_source",
    uniqueConstraints = @UniqueConstraint(columnNames = {"service_execution_id", "source_type", "source_id"})
)
public class ServiceExecutionSource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_execution_id", nullable = false)
    private ServiceExecution serviceExecution;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 64)
    private ServiceExecutionFactSourceType sourceType;

    @Column(nullable = false)
    private Long sourceId;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ServiceExecution getServiceExecution() {
        return serviceExecution;
    }

    public void setServiceExecution(ServiceExecution serviceExecution) {
        this.serviceExecution = serviceExecution;
    }

    public ServiceExecutionFactSourceType getSourceType() {
        return sourceType;
    }

    public void setSourceType(ServiceExecutionFactSourceType sourceType) {
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
}
