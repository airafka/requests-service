package com.example.requests.receiving;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "receiving_order_container",
    uniqueConstraints = @UniqueConstraint(columnNames = {"receiving_order_id", "container_id"})
)
public class ReceivingOrderContainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiving_order_id", nullable = false)
    private ReceivingOrder receivingOrder;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    public Long getId() {
        return id;
    }

    public ReceivingOrder getReceivingOrder() {
        return receivingOrder;
    }

    public void setReceivingOrder(ReceivingOrder receivingOrder) {
        this.receivingOrder = receivingOrder;
    }

    public ContainerEntity getContainer() {
        return container;
    }

    public void setContainer(ContainerEntity container) {
        this.container = container;
    }
}
