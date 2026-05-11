package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShippingOrderContainerRepository extends JpaRepository<ShippingOrderContainer, Long> {
    @EntityGraph(attributePaths = {"shippingOrder"})
    Optional<ShippingOrderContainer> findWithShippingOrderById(Long id);
}
