package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface BillingOperationRepository extends JpaRepository<BillingOperation, Long> {
    boolean existsByNameIgnoreCase(String name);

    List<BillingOperation> findAllByOrderByNameAsc();

    List<BillingOperation> findByIdIn(Collection<Long> ids);
}
