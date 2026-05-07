package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContainerOwnerChangeOrderRepository extends JpaRepository<ContainerOwnerChangeOrder, Long> {
    boolean existsByNumberIgnoreCase(String number);

    @EntityGraph(attributePaths = {"newClient", "containers", "containers.container"})
    List<ContainerOwnerChangeOrder> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"newClient", "containers", "containers.container"})
    Optional<ContainerOwnerChangeOrder> findWithContainersById(Long id);

    @Query(value = "select coalesce(max(cast(number as bigint)), 0) from container_owner_change_order where number ~ '^[0-9]+$'", nativeQuery = true)
    long findMaxNumericNumber();
}
