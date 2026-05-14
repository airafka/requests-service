package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TosOperationFactRepository extends JpaRepository<TosOperationFact, Long> {
    @EntityGraph(attributePaths = {"operation", "container", "receivingOrder", "shippingOrder"})
    List<TosOperationFact> findAllByOrderByOperationTimeDescIdDesc();
}
