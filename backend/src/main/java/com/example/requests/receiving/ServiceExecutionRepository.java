package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ServiceExecutionRepository extends JpaRepository<ServiceExecution, Long> {
    boolean existsBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
        ServiceExecutionSourceType sourceType,
        ServiceExecutionBasisType basisType,
        Long basisId,
        Long serviceId,
        Long containerId
    );

    Optional<ServiceExecution> findBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
        ServiceExecutionSourceType sourceType,
        ServiceExecutionBasisType basisType,
        Long basisId,
        Long serviceId,
        Long containerId
    );

    @EntityGraph(attributePaths = {"client", "container", "service"})
    List<ServiceExecution> findAllByOrderByDateFromDescIdDesc();

    @EntityGraph(attributePaths = {"client", "container", "service", "sources"})
    Optional<ServiceExecution> findWithSourcesById(Long id);

    @EntityGraph(attributePaths = {"client", "container", "service"})
    List<ServiceExecution> findByStatusAndDateFromBetweenOrderByDateFromAscIdAsc(
        ServiceExecutionStatus status,
        LocalDate dateFrom,
        LocalDate dateTo
    );

    @EntityGraph(attributePaths = {"client", "container", "service"})
    @Query("""
        select execution
        from ServiceExecution execution
        where execution.status = :status
          and execution.dateFrom <= :dateTo
          and (execution.dateTo is null or execution.dateTo >= :dateFrom)
        order by execution.dateFrom asc, execution.id asc
        """)
    List<ServiceExecution> findByStatusAndDateRangeOverlapOrderByDateFromAscIdAsc(
        @Param("status") ServiceExecutionStatus status,
        @Param("dateFrom") LocalDate dateFrom,
        @Param("dateTo") LocalDate dateTo
    );
}
