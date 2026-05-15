package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingAccrualSourceRepository extends JpaRepository<BillingAccrualSource, Long> {
    boolean existsByBillingPeriodIdAndServiceExecutionId(Long billingPeriodId, Long serviceExecutionId);
}
