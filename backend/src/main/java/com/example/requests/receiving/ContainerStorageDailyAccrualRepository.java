package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ContainerStorageDailyAccrualRepository extends JpaRepository<ContainerStorageDailyAccrual, Long> {
    boolean existsByStoragePeriodIdAndAccrualDate(Long storagePeriodId, LocalDate accrualDate);

    @EntityGraph(attributePaths = {"storagePeriod", "container", "client", "service"})
    List<ContainerStorageDailyAccrual> findAllByOrderByAccrualDateDescIdDesc();

    @EntityGraph(attributePaths = {"storagePeriod"})
    List<ContainerStorageDailyAccrual> findByStatusAndAccrualDateAfterOrderByAccrualDateDescIdDesc(
        ContainerStorageDailyAccrualStatus status,
        LocalDate accrualDate
    );

    @EntityGraph(attributePaths = {"storagePeriod"})
    List<ContainerStorageDailyAccrual> findByStoragePeriodIdAndStatusAndAccrualDateGreaterThanEqualOrderByAccrualDateDescIdDesc(
        Long storagePeriodId,
        ContainerStorageDailyAccrualStatus status,
        LocalDate accrualDate
    );
}
