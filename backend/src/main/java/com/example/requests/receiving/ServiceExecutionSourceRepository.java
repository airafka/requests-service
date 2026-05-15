package com.example.requests.receiving;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceExecutionSourceRepository extends JpaRepository<ServiceExecutionSource, Long> {
    boolean existsByServiceExecutionIdAndSourceTypeAndSourceId(
        Long serviceExecutionId,
        ServiceExecutionFactSourceType sourceType,
        Long sourceId
    );
}
