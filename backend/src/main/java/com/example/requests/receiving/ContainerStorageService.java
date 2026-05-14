package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class ContainerStorageService {
    private static final String STORAGE_SERVICE_NAME = "\u0425\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u041a\u0422\u041a";

    private final ContainerStoragePeriodRepository periodRepository;
    private final ContainerStorageDailyAccrualRepository accrualRepository;
    private final BillingServiceRepository billingServiceRepository;

    public ContainerStorageService(
        ContainerStoragePeriodRepository periodRepository,
        ContainerStorageDailyAccrualRepository accrualRepository,
        BillingServiceRepository billingServiceRepository
    ) {
        this.periodRepository = periodRepository;
        this.accrualRepository = accrualRepository;
        this.billingServiceRepository = billingServiceRepository;
    }

    @Transactional
    public ContainerStoragePeriod openStoragePeriod(
        ContainerEntity container,
        ClientEntity client,
        LocalDate dateFrom,
        ContainerStorageSourceType sourceType,
        Long sourceId
    ) {
        return openStoragePeriod(container, client, dateFrom, storageService(), sourceType, sourceId);
    }

    @Transactional
    public ContainerStoragePeriod openStoragePeriod(
        ContainerEntity container,
        ClientEntity client,
        LocalDate dateFrom,
        BillingService service,
        ContainerStorageSourceType sourceType,
        Long sourceId
    ) {
        return periodRepository
            .findByContainerIdAndStatus(container.getId(), ContainerStoragePeriodStatus.ACTIVE)
            .orElseGet(() -> {
                ContainerStoragePeriod period = new ContainerStoragePeriod();
                period.setContainer(container);
                period.setContainerNumber(container.getNumber());
                period.setClient(client);
                period.setService(service);
                period.setDateFrom(dateFrom);
                period.setStatus(ContainerStoragePeriodStatus.ACTIVE);
                period.setSourceType(sourceType);
                period.setSourceId(sourceId);
                return periodRepository.save(period);
            });
    }

    @Transactional
    public void closeStoragePeriod(ContainerEntity container, LocalDate dateTo) {
        periodRepository
            .findByContainerIdAndStatus(container.getId(), ContainerStoragePeriodStatus.ACTIVE)
            .ifPresent(period -> {
                period.setDateTo(dateTo);
                period.setStatus(ContainerStoragePeriodStatus.CLOSED);
                periodRepository.save(period);
            });
    }

    @Transactional
    public List<ContainerStorageDailyAccrual> accrueStorageDay(LocalDate date) {
        BillingService service = storageService();
        List<ContainerStoragePeriod> activePeriods = periodRepository
            .findByStatusAndDateFromLessThanEqualOrderByDateFromAscIdAsc(ContainerStoragePeriodStatus.ACTIVE, date);

        return activePeriods.stream()
            .filter(period -> !accrualRepository.existsByStoragePeriodIdAndAccrualDate(period.getId(), date))
            .map(period -> createAccrual(period, service, date))
            .toList();
    }

    @Transactional
    public void rollbackStorageAfter(LocalDate date) {
        List<ContainerStorageDailyAccrual> accruals = accrualRepository
            .findByStatusAndAccrualDateAfterOrderByAccrualDateDescIdDesc(
                ContainerStorageDailyAccrualStatus.ACCRUED,
                date
            );

        for (ContainerStorageDailyAccrual accrual : accruals) {
            ContainerStoragePeriod period = accrual.getStoragePeriod();
            period.setStorageDays(Math.max(period.getStorageDays() - accrual.getQuantity(), 0));
            periodRepository.save(period);
            accrualRepository.delete(accrual);
        }
    }

    private ContainerStorageDailyAccrual createAccrual(
        ContainerStoragePeriod period,
        BillingService service,
        LocalDate date
    ) {
        ContainerStorageDailyAccrual accrual = new ContainerStorageDailyAccrual();
        accrual.setStoragePeriod(period);
        accrual.setContainer(period.getContainer());
        accrual.setContainerNumber(period.getContainerNumber());
        accrual.setClient(period.getClient());
        accrual.setAccrualDate(date);
        accrual.setService(service);
        accrual.setQuantity(1);
        accrual.setSource(ContainerStorageDailyAccrualSource.SYSTEM);
        accrual.setStatus(ContainerStorageDailyAccrualStatus.ACCRUED);

        period.setStorageDays(period.getStorageDays() + 1);
        periodRepository.save(period);
        return accrualRepository.save(accrual);
    }

    private BillingService storageService() {
        return billingServiceRepository.findByNameIgnoreCase(STORAGE_SERVICE_NAME)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Storage service was not found"));
    }
}
