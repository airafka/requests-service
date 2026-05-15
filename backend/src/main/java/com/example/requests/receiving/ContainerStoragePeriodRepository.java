package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ContainerStoragePeriodRepository extends JpaRepository<ContainerStoragePeriod, Long> {
    @EntityGraph(attributePaths = {"container", "client", "service", "ownerHistory"})
    List<ContainerStoragePeriod> findAllByOrderByDateFromDescIdDesc();

    @EntityGraph(attributePaths = {"container", "client", "service", "ownerHistory"})
    Optional<ContainerStoragePeriod> findByContainerIdAndStatus(Long containerId, ContainerStoragePeriodStatus status);

    @EntityGraph(attributePaths = {"container", "client", "service", "ownerHistory"})
    List<ContainerStoragePeriod> findByStatusAndDateFromLessThanEqualOrderByDateFromAscIdAsc(
        ContainerStoragePeriodStatus status,
        LocalDate dateFrom
    );

    @EntityGraph(attributePaths = {"container", "client", "service", "ownerHistory"})
    @Query("""
        select period
        from ContainerStoragePeriod period
        where period.dateFrom <= :date
          and (
            period.status = com.example.requests.receiving.ContainerStoragePeriodStatus.ACTIVE
            or (
              period.status = com.example.requests.receiving.ContainerStoragePeriodStatus.CLOSED
              and period.dateTo is not null
              and period.dateTo > :date
            )
          )
        order by period.dateFrom asc, period.id asc
        """)
    List<ContainerStoragePeriod> findAccruableForDate(@Param("date") LocalDate date);
}
