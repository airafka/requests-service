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
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "container_owner_change_order")
public class ContainerOwnerChangeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String number;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "new_client_id", nullable = false)
    private ClientEntity newClient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private BillingService service;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ContainerOwnerChangeOrderStatus status = ContainerOwnerChangeOrderStatus.DRAFT;

    @Column(columnDefinition = "text")
    private String comment;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private LocalDate serviceDate;

    @Column(length = 180)
    private String createdBy;

    private OffsetDateTime completedAt;

    @Column(length = 180)
    private String completedBy;

    @OneToMany(mappedBy = "ownerChangeOrder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ContainerOwnerChangeOrderContainer> containers = new ArrayList<>();

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
        if (serviceDate == null) {
            serviceDate = LocalDate.now();
        }
    }

    public Long getId() {
        return id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public ClientEntity getNewClient() {
        return newClient;
    }

    public void setNewClient(ClientEntity newClient) {
        this.newClient = newClient;
    }

    public BillingService getService() {
        return service;
    }

    public void setService(BillingService service) {
        this.service = service;
    }

    public ContainerOwnerChangeOrderStatus getStatus() {
        return status;
    }

    public void setStatus(ContainerOwnerChangeOrderStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public OffsetDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(OffsetDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public String getCompletedBy() {
        return completedBy;
    }

    public void setCompletedBy(String completedBy) {
        this.completedBy = completedBy;
    }

    public List<ContainerOwnerChangeOrderContainer> getContainers() {
        return containers;
    }

    public void addContainer(ContainerEntity container) {
        ContainerOwnerChangeOrderContainer link = new ContainerOwnerChangeOrderContainer();
        link.setOwnerChangeOrder(this);
        link.setContainer(container);
        containers.add(link);
    }
}
