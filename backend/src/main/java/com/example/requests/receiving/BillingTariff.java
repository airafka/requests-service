package com.example.requests.receiving;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tariff")
public class BillingTariff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 180)
    private String name;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal cost;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "tariff_service",
        joinColumns = @JoinColumn(name = "tariff_id"),
        inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<BillingService> services = new LinkedHashSet<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public Set<BillingService> getServices() {
        return services;
    }

    public void setServices(Set<BillingService> services) {
        this.services = services;
    }
}
