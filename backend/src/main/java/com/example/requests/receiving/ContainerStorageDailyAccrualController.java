package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/storage-accruals")
public class ContainerStorageDailyAccrualController {
    private final ContainerStorageDailyAccrualRepository accrualRepository;
    private final ContainerStorageService storageService;

    public ContainerStorageDailyAccrualController(
        ContainerStorageDailyAccrualRepository accrualRepository,
        ContainerStorageService storageService
    ) {
        this.accrualRepository = accrualRepository;
        this.storageService = storageService;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<ContainerStorageDailyAccrualResponse> list(
        @RequestParam(required = false) LocalDate date,
        @RequestParam(required = false) String containerNumber,
        @RequestParam(required = false) Long clientId
    ) {
        return accrualRepository.findAllByOrderByAccrualDateDescIdDesc().stream()
            .filter(accrual -> date == null || accrual.getAccrualDate().equals(date))
            .filter(accrual -> containerNumber == null || containsIgnoreCase(accrual.getContainerNumber(), containerNumber))
            .filter(accrual -> clientId == null || accrual.getClient().getId().equals(clientId))
            .map(ContainerStorageDailyAccrualResponse::fromEntity)
            .toList();
    }

    @PostMapping("/accrue")
    @Transactional
    public List<ContainerStorageDailyAccrualResponse> accrue(@Valid @RequestBody AccrueStorageDayDto dto) {
        return storageService.accrueStorageDay(dto.date()).stream()
            .map(ContainerStorageDailyAccrualResponse::fromEntity)
            .toList();
    }

    @PostMapping("/rollback-after")
    @Transactional
    public void rollbackAfter(@Valid @RequestBody AccrueStorageDayDto dto) {
        storageService.rollbackStorageAfter(dto.date());
    }

    private boolean containsIgnoreCase(String source, String part) {
        return source != null && source.toLowerCase().contains(part.trim().toLowerCase());
    }
}
