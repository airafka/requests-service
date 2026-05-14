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
@Table(name = "receiving_order")
public class ReceivingOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String number;

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private ClientEntity client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complex_service_id")
    private ComplexService complexService;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "receiving_date", nullable = false)
    private LocalDate plannedReceivingDate;

    private LocalDate actualReceivingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ReceivingOrderStatus status = ReceivingOrderStatus.DRAFT;

    @OneToMany(mappedBy = "receivingOrder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ReceivingOrderContainer> containers = new ArrayList<>();

    @PrePersist
    void onCreate() {
        createdAt = OffsetDateTime.now();
        if (plannedReceivingDate == null) {
            plannedReceivingDate = LocalDate.now();
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

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public ComplexService getComplexService() {
        return complexService;
    }

    public void setComplexService(ComplexService complexService) {
        this.complexService = complexService;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDate getPlannedReceivingDate() {
        return plannedReceivingDate;
    }

    public void setPlannedReceivingDate(LocalDate plannedReceivingDate) {
        this.plannedReceivingDate = plannedReceivingDate;
    }

    public LocalDate getActualReceivingDate() {
        return actualReceivingDate;
    }

    public void setActualReceivingDate(LocalDate actualReceivingDate) {
        this.actualReceivingDate = actualReceivingDate;
    }

    public ReceivingOrderStatus getStatus() {
        return status;
    }

    public void setStatus(ReceivingOrderStatus status) {
        this.status = status;
    }

    public List<ReceivingOrderContainer> getContainers() {
        return containers;
    }

    public void addContainer(ContainerEntity container) {
        ReceivingOrderContainer link = new ReceivingOrderContainer();
        link.setReceivingOrder(this);
        link.setContainer(container);
        containers.add(link);
    }
}
