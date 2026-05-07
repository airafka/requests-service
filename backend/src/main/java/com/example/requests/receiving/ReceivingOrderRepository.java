package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceivingOrderRepository extends JpaRepository<ReceivingOrder, Long> {
    boolean existsByNumberIgnoreCase(String number);

    @EntityGraph(attributePaths = {"containers", "containers.container"})
    List<ReceivingOrder> findAllByOrderByCreatedAtDesc();
}
