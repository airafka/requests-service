package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ShippingOrderRepository extends JpaRepository<ShippingOrder, Long> {
    @EntityGraph(attributePaths = {"client", "containers", "containers.container"})
    List<ShippingOrder> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"client", "containers", "containers.container"})
    @Query("select shippingOrder from ShippingOrder shippingOrder where shippingOrder.id = :id")
    Optional<ShippingOrder> findWithContainersById(@Param("id") Long id);

    @Query(value = "select coalesce(max(cast(number as bigint)), 0) from shipping_order where number ~ '^[0-9]+$'", nativeQuery = true)
    long findMaxNumericNumber();
}
