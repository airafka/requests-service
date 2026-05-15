package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillingAccrualRepository extends JpaRepository<BillingAccrual, Long> {
    @EntityGraph(attributePaths = {"billingPeriod", "client", "service", "tariff"})
    List<BillingAccrual> findAllByOrderByCreatedAtDescIdDesc();

    @EntityGraph(attributePaths = {"billingPeriod", "client", "service", "tariff"})
    List<BillingAccrual> findByBillingPeriodIdOrderByCreatedAtDescIdDesc(Long billingPeriodId);

    @EntityGraph(attributePaths = {"billingPeriod", "client", "service", "tariff", "sources", "sources.serviceExecution", "sources.serviceExecution.client", "sources.serviceExecution.container", "sources.serviceExecution.service"})
    Optional<BillingAccrual> findWithSourcesById(Long id);
}

