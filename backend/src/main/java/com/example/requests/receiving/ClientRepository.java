package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    boolean existsByNameIgnoreCase(String name);

    List<ClientEntity> findAllByOrderByNameAsc();
}
