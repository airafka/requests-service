package com.example.requests.receiving;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "complex_service")
public class ComplexService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 180)
    private String name;

    @Column(nullable = false, precision = 12, scale = 4)
    private BigDecimal coefficient = BigDecimal.ONE;

    @Column(name = "amount_per_container", nullable = false, precision = 14, scale = 2)
    private BigDecimal amountPerContainer = BigDecimal.ZERO;

    @OneToMany(mappedBy = "complexService", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("id ASC")
    private List<ComplexServiceItem> items = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public BigDecimal getAmountPerContainer() {
        return amountPerContainer;
    }

    public void setAmountPerContainer(BigDecimal amountPerContainer) {
        this.amountPerContainer = amountPerContainer;
    }

    public List<ComplexServiceItem> getItems() {
        return items;
    }

    public void setItems(List<ComplexServiceItem> items) {
        this.items.clear();
        items.forEach(this::addItem);
    }

    public void addItem(ComplexServiceItem item) {
        item.setComplexService(this);
        items.add(item);
    }
}
