package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ContainerStoragePeriodRepository extends JpaRepository<ContainerStoragePeriod, Long> {
    @EntityGraph(attributePaths = {"container", "client", "service"})
    List<ContainerStoragePeriod> findAllByOrderByDateFromDescIdDesc();

    @EntityGraph(attributePaths = {"container", "client", "service"})
    Optional<ContainerStoragePeriod> findByContainerIdAndStatus(Long containerId, ContainerStoragePeriodStatus status);

    @EntityGraph(attributePaths = {"container", "client", "service"})
    List<ContainerStoragePeriod> findByStatusAndDateFromLessThanEqualOrderByDateFromAscIdAsc(
        ContainerStoragePeriodStatus status,
        LocalDate dateFrom
    );
}
