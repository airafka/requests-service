package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillingPeriodRepository extends JpaRepository<BillingPeriod, Long> {
    boolean existsByDateFromAndDateToAndStatusNot(LocalDate dateFrom, LocalDate dateTo, BillingPeriodStatus status);

    boolean existsByClientIdAndDateFromAndDateToAndStatusNot(
        Long clientId,
        LocalDate dateFrom,
        LocalDate dateTo,
        BillingPeriodStatus status
    );

    @EntityGraph(attributePaths = {"client"})
    List<BillingPeriod> findAllByOrderByDateFromDescIdDesc();

    @EntityGraph(attributePaths = {"client", "accruals", "accruals.client", "accruals.service", "accruals.tariff"})
    Optional<BillingPeriod> findWithAccrualsById(Long id);
}
