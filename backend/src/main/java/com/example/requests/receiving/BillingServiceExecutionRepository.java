package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingServiceExecutionRepository extends JpaRepository<BillingServiceExecution, Long> {
    boolean existsByReceivingOrderContainerIdAndServiceId(Long receivingOrderContainerId, Long serviceId);

    Optional<BillingServiceExecution> findByReceivingOrderContainerIdAndServiceId(Long receivingOrderContainerId, Long serviceId);
}
