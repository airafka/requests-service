package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplexServiceRepository extends JpaRepository<ComplexService, Long> {
    boolean existsByNameIgnoreCase(String name);

    Optional<ComplexService> findByNameIgnoreCase(String name);

    @EntityGraph(attributePaths = {"items", "items.service", "items.service.operations"})
    List<ComplexService> findAllByOrderByNameAsc();

    @EntityGraph(attributePaths = {"items", "items.service", "items.service.operations"})
    Optional<ComplexService> findWithItemsById(Long id);
}
