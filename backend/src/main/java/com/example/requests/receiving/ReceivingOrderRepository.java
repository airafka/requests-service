package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReceivingOrderRepository extends JpaRepository<ReceivingOrder, Long> {
    boolean existsByNumberIgnoreCase(String number);

    @EntityGraph(attributePaths = {"client", "complexService", "containers", "containers.container"})
    List<ReceivingOrder> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"client", "complexService", "containers", "containers.container"})
    @Query("select receivingOrder from ReceivingOrder receivingOrder where receivingOrder.id = :id")
    Optional<ReceivingOrder> findWithContainersById(@Param("id") Long id);

    @Query(value = "select coalesce(max(cast(number as bigint)), 0) from receiving_order where number ~ '^[0-9]+$'", nativeQuery = true)
    long findMaxNumericNumber();
}
