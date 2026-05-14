package com.example.requests.receiving;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/storage-periods")
public class ContainerStoragePeriodController {
    private final ContainerStoragePeriodRepository periodRepository;

    public ContainerStoragePeriodController(ContainerStoragePeriodRepository periodRepository) {
        this.periodRepository = periodRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<ContainerStoragePeriodResponse> list(
        @RequestParam(required = false) String containerNumber,
        @RequestParam(required = false) Long clientId,
        @RequestParam(required = false) ContainerStoragePeriodStatus status,
        @RequestParam(required = false) LocalDate date
    ) {
        return periodRepository.findAllByOrderByDateFromDescIdDesc().stream()
            .filter(period -> containerNumber == null || containsIgnoreCase(period.getContainerNumber(), containerNumber))
            .filter(period -> clientId == null || period.getClient().getId().equals(clientId))
            .filter(period -> status == null || period.getStatus() == status)
            .filter(period -> date == null || !period.getDateFrom().isAfter(date))
            .filter(period -> date == null || period.getDateTo() == null || period.getDateTo().isAfter(date))
            .map(ContainerStoragePeriodResponse::fromEntity)
            .toList();
    }

    private boolean containsIgnoreCase(String source, String part) {
        return source != null && source.toLowerCase().contains(part.trim().toLowerCase());
    }
}
