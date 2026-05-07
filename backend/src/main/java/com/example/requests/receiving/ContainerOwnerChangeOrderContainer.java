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
    name = "container_owner_change_order_container",
    uniqueConstraints = @UniqueConstraint(columnNames = {"owner_change_order_id", "container_id"})
)
public class ContainerOwnerChangeOrderContainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_change_order_id", nullable = false)
    private ContainerOwnerChangeOrder ownerChangeOrder;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerEntity container;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public ContainerOwnerChangeOrder getOwnerChangeOrder() {
        return ownerChangeOrder;
    }

    public void setOwnerChangeOrder(ContainerOwnerChangeOrder ownerChangeOrder) {
        this.ownerChangeOrder = ownerChangeOrder;
    }

    public ContainerEntity getContainer() {
        return container;
    }

    public void setContainer(ContainerEntity container) {
        this.container = container;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
