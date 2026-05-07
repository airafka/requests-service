package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ContainerRepository extends JpaRepository<ContainerEntity, Long> {
    boolean existsByNumberIgnoreCase(String number);

    Optional<ContainerEntity> findByNumberIgnoreCase(String number);

    List<ContainerEntity> findAllByOrderByNumberAsc();

    List<ContainerEntity> findByNumberIn(Collection<String> numbers);

    @Query("""
        select container
        from ContainerEntity container
        where not exists (
            select 1
            from ContainerOwnerHistory history
            where history.container = container
              and history.validTo is null
        )
        order by container.number asc
        """)
    List<ContainerEntity> findAvailableForReceiving();
}
