package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TosOperationFactRepository extends JpaRepository<TosOperationFact, Long> {
    @EntityGraph(attributePaths = {"operation", "container", "receivingOrder", "shippingOrder"})
    List<TosOperationFact> findAllByOrderByOperationTimeDescIdDesc();

    @EntityGraph(attributePaths = {"operation", "container", "receivingOrder", "shippingOrder"})
    List<TosOperationFact> findByStatusInOrderByOperationTimeAscIdAsc(Collection<TosOperationFactStatus> statuses);

    @EntityGraph(attributePaths = {"operation", "container", "receivingOrder", "receivingOrder.complexService", "receivingOrder.complexService.items", "receivingOrder.complexService.items.service", "shippingOrder"})
    Optional<TosOperationFact> findWithContextById(Long id);
}
