package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShippingOrderRepository extends JpaRepository<ShippingOrder, Long> {
    @EntityGraph(attributePaths = {"client", "containers", "containers.container"})
    List<ShippingOrder> findAllByOrderByCreatedAtDesc();

    @Query(value = "select coalesce(max(cast(number as bigint)), 0) from shipping_order where number ~ '^[0-9]+$'", nativeQuery = true)
    long findMaxNumericNumber();
}
