package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReceivingOrderContainerRepository extends JpaRepository<ReceivingOrderContainer, Long> {
    @EntityGraph(attributePaths = {"receivingOrder"})
    Optional<ReceivingOrderContainer> findWithReceivingOrderById(Long id);
}
