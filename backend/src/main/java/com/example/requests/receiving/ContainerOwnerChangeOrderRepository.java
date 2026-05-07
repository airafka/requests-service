package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContainerOwnerChangeOrderRepository extends JpaRepository<ContainerOwnerChangeOrder, Long> {
    boolean existsByNumberIgnoreCase(String number);

    @EntityGraph(attributePaths = {"newClient", "containers", "containers.container"})
    List<ContainerOwnerChangeOrder> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"newClient", "containers", "containers.container"})
    Optional<ContainerOwnerChangeOrder> findWithContainersById(Long id);
}
