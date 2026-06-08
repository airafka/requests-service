package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class ContainerStorageService {
    private static final String STORAGE_SERVICE_NAME = "\u0423\u0447\u0435\u0442 \u0438 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f";

    private final ContainerStoragePeriodRepository periodRepository;
    private final BillingServiceRepository billingServiceRepository;
    private final ServiceExecutionService serviceExecutionService;

    public ContainerStorageService(
        ContainerStoragePeriodRepository periodRepository,
        BillingServiceRepository billingServiceRepository,
        ServiceExecutionService serviceExecutionService
    ) {
        this.periodRepository = periodRepository;
        this.billingServiceRepository = billingServiceRepository;
        this.serviceExecutionService = serviceExecutionService;
    }

    @Transactional
    public ContainerStoragePeriod openStoragePeriod(
        ContainerEntity container,
        ClientEntity client,
        LocalDate dateFrom,
        ContainerStorageSourceType sourceType,
        Long sourceId
    ) {
        return openStoragePeriod(container, client, dateFrom, storageService(), sourceType, sourceId, null);
    }

    @Transactional
    public ContainerStoragePeriod openStoragePeriod(
        ContainerEntity container,
        ClientEntity client,
        LocalDate dateFrom,
        ContainerStorageSourceType sourceType,
        Long sourceId,
        ContainerOwnerHistory ownerHistory
    ) {
        return openStoragePeriod(container, client, dateFrom, storageService(), sourceType, sourceId, ownerHistory);
    }

    @Transactional
    public ContainerStoragePeriod openStoragePeriod(
        ContainerEntity container,
        ClientEntity client,
        LocalDate dateFrom,
        BillingService service,
        ContainerStorageSourceType sourceType,
        Long sourceId,
        ContainerOwnerHistory ownerHistory
    ) {
        return periodRepository
            .findByContainerIdAndStatus(container.getId(), ContainerStoragePeriodStatus.ACTIVE)
            .orElseGet(() -> {
                ContainerStoragePeriod newPeriod = new ContainerStoragePeriod();
                newPeriod.setContainer(container);
                newPeriod.setContainerNumber(container.getNumber());
                newPeriod.setClient(client);
                newPeriod.setService(service);
                newPeriod.setDateFrom(dateFrom);
                newPeriod.setStatus(ContainerStoragePeriodStatus.ACTIVE);
                newPeriod.setSourceType(sourceType);
                newPeriod.setSourceId(sourceId);
                newPeriod.setOwnerHistory(ownerHistory);
                ContainerStoragePeriod saved = periodRepository.saveAndFlush(newPeriod);
                serviceExecutionService.createOrUpdateForStoragePeriod(saved, dateFrom);
                return saved;
            });
    }

    @Transactional
    public void closeStoragePeriod(ContainerEntity container, LocalDate dateTo) {
        periodRepository
            .findByContainerIdAndStatus(container.getId(), ContainerStoragePeriodStatus.ACTIVE)
            .ifPresent(period -> {
                period.setDateTo(dateTo);
                period.setStorageDays(storageDays(period.getDateFrom(), dateTo));
                period.setStatus(ContainerStoragePeriodStatus.CLOSED);
                ContainerStoragePeriod saved = periodRepository.save(period);
                serviceExecutionService.createOrUpdateForStoragePeriod(saved, dateTo);
            });
    }

    @Transactional
    public void closeStoragePeriodForOwnerChange(ContainerEntity container, LocalDate changeDate) {
        periodRepository
            .findByContainerIdAndStatus(container.getId(), ContainerStoragePeriodStatus.ACTIVE)
            .ifPresent(period -> {
                period.setDateTo(changeDate);
                period.setStorageDays(storageDays(period.getDateFrom(), changeDate));
                period.setStatus(ContainerStoragePeriodStatus.CLOSED);
                ContainerStoragePeriod saved = periodRepository.save(period);
                serviceExecutionService.createOrUpdateForStoragePeriod(saved, changeDate);
            });
    }

    @Transactional
    private BillingService storageService() {
        return billingServiceRepository.findByNameIgnoreCase(STORAGE_SERVICE_NAME)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Storage service was not found"));
    }

    private int storageDays(LocalDate dateFrom, LocalDate dateToExclusive) {
        if (dateFrom == null || dateToExclusive == null || !dateToExclusive.isAfter(dateFrom)) {
            return 0;
        }
        return Math.toIntExact(ChronoUnit.DAYS.between(dateFrom, dateToExclusive));
    }
}
