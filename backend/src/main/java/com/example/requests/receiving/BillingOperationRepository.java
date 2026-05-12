package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BillingOperationRepository extends JpaRepository<BillingOperation, Long> {
    boolean existsByNameIgnoreCase(String name);

    Optional<BillingOperation> findByNameIgnoreCase(String name);

    List<BillingOperation> findAllByOrderByNameAsc();

    List<BillingOperation> findByIdIn(Collection<Long> ids);
}
