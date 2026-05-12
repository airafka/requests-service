package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillingTariffRepository extends JpaRepository<BillingTariff, Long> {
    boolean existsByNameIgnoreCase(String name);

    Optional<BillingTariff> findByNameIgnoreCase(String name);

    @EntityGraph(attributePaths = {"services", "services.operations"})
    List<BillingTariff> findAllByOrderByNameAsc();
}
