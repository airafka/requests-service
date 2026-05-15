package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
