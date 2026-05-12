package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BillingServiceRepository extends JpaRepository<BillingService, Long> {
    boolean existsByNameIgnoreCase(String name);

    @EntityGraph(attributePaths = {"operations"})
    List<BillingService> findAllByOrderByNameAsc();

    @EntityGraph(attributePaths = {"operations"})
    Optional<BillingService> findWithOperationsById(Long id);

    @EntityGraph(attributePaths = {"operations"})
    List<BillingService> findByIdIn(Collection<Long> ids);
}
