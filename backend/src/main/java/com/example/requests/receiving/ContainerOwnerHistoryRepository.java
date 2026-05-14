package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ContainerOwnerHistoryRepository extends JpaRepository<ContainerOwnerHistory, Long> {
    boolean existsByOperationTypeAndSourceId(ContainerOwnerOperationType operationType, Long sourceId);

    Optional<ContainerOwnerHistory> findByOperationTypeAndSourceId(ContainerOwnerOperationType operationType, Long sourceId);

    @EntityGraph(attributePaths = {"container", "client"})
    Optional<ContainerOwnerHistory> findByContainerIdAndValidToIsNull(Long containerId);

    @EntityGraph(attributePaths = {"container", "client"})
    List<ContainerOwnerHistory> findByContainerIdInAndValidToIsNull(Collection<Long> containerIds);

    @EntityGraph(attributePaths = {"container", "client"})
    List<ContainerOwnerHistory> findAllByValidToIsNullOrderByContainer_NumberAsc();

    @EntityGraph(attributePaths = {"container", "client"})
    List<ContainerOwnerHistory> findAllByContainerIdOrderByValidFromDescIdDesc(Long containerId);

    @EntityGraph(attributePaths = {"container", "client"})
    List<ContainerOwnerHistory> findAllByOrderByValidFromDescIdDesc();
}
