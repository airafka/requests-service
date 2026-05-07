package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ContainerRepository extends JpaRepository<ContainerEntity, Long> {
    boolean existsByNumberIgnoreCase(String number);

    Optional<ContainerEntity> findByNumberIgnoreCase(String number);

    List<ContainerEntity> findAllByOrderByNumberAsc();

    List<ContainerEntity> findByNumberIn(Collection<String> numbers);
}
