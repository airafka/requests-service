package com.example.requests.receiving;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TariffRepository extends JpaRepository<Tariff, Long> {
    @EntityGraph(attributePaths = {"services"})
    List<Tariff> findByServices_IdOrderByIdAsc(Long serviceId);
}

