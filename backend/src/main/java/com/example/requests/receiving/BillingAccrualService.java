package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class BillingAccrualService {
    private final BillingPeriodRepository periodRepository;
    private final BillingAccrualRepository accrualRepository;
    private final BillingAccrualSourceRepository sourceRepository;
    private final ServiceExecutionRepository serviceExecutionRepository;
    private final TariffRepository tariffRepository;

    public BillingAccrualService(
        BillingPeriodRepository periodRepository,
        BillingAccrualRepository accrualRepository,
        BillingAccrualSourceRepository sourceRepository,
        ServiceExecutionRepository serviceExecutionRepository,
        TariffRepository tariffRepository
    ) {
        this.periodRepository = periodRepository;
        this.accrualRepository = accrualRepository;
        this.sourceRepository = sourceRepository;
        this.serviceExecutionRepository = serviceExecutionRepository;
        this.tariffRepository = tariffRepository;
    }

    @Transactional
    public BillingPeriod calculatePeriod(Long periodId) {
        BillingPeriod period = periodRepository.findById(periodId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billing period was not found"));

        if (period.getStatus() == BillingPeriodStatus.CLOSED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Расчетный период закрыт");
        }
        if (period.getStatus() == BillingPeriodStatus.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Расчетный период отменен");
        }
        if (period.getStatus() == BillingPeriodStatus.CALCULATED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Период уже рассчитан");
        }

        List<ServiceExecution> executions = serviceExecutionRepository
            .findByStatusAndDateFromBetweenOrderByDateFromAscIdAsc(
                ServiceExecutionStatus.CONFIRMED,
                period.getDateFrom(),
                period.getDateTo()
            )
            .stream()
            .filter(execution -> !sourceRepository.existsByBillingPeriodIdAndServiceExecutionId(period.getId(), execution.getId()))
            .toList();

        Map<Long, Tariff> tariffsByServiceId = new LinkedHashMap<>();
        List<String> missingTariffs = new ArrayList<>();

        for (ServiceExecution execution : executions) {
            Long serviceId = execution.getService().getId();
            if (tariffsByServiceId.containsKey(serviceId)) {
                continue;
            }

            // TODO: На следующем этапе добавить полноценные правила выбора тарифа, коэффициенты и прогрессивные ставки.
            List<Tariff> tariffs = tariffRepository.findByServices_IdOrderByIdAsc(serviceId);
            if (tariffs.isEmpty()) {
                missingTariffs.add("service_execution #" + execution.getId() + ", service #" + serviceId);
                continue;
            }
            tariffsByServiceId.put(serviceId, tariffs.get(0));
        }

        if (!missingTariffs.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Для части оказанных услуг не найден тариф: " + String.join("; ", missingTariffs)
            );
        }

        Map<AccrualGroupKey, List<ServiceExecution>> groups = new LinkedHashMap<>();
        for (ServiceExecution execution : executions) {
            Tariff tariff = tariffsByServiceId.get(execution.getService().getId());
            AccrualGroupKey key = new AccrualGroupKey(
                execution.getClient().getId(),
                execution.getService().getId(),
                tariff.getId(),
                execution.getUnit()
            );
            groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(execution);
        }

        for (List<ServiceExecution> groupExecutions : groups.values()) {
            ServiceExecution first = groupExecutions.get(0);
            Tariff tariff = tariffsByServiceId.get(first.getService().getId());
            BigDecimal quantity = groupExecutions.stream()
                .map(execution -> BigDecimal.valueOf(execution.getQuantity()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal unitPrice = tariff.getCost().setScale(2, RoundingMode.HALF_UP);

            BillingAccrual accrual = new BillingAccrual();
            accrual.setBillingPeriod(period);
            accrual.setClient(first.getClient());
            accrual.setService(first.getService());
            accrual.setTariff(tariff);
            accrual.setQuantity(quantity);
            accrual.setUnit(first.getUnit());
            accrual.setUnitPrice(unitPrice);
            accrual.setAmount(quantity.multiply(unitPrice).setScale(2, RoundingMode.HALF_UP));
            accrual.setStatus(BillingAccrualStatus.CALCULATED);
            BillingAccrual saved = accrualRepository.saveAndFlush(accrual);

            for (ServiceExecution execution : groupExecutions) {
                BillingAccrualSource source = new BillingAccrualSource();
                source.setBillingAccrual(saved);
                source.setBillingPeriod(period);
                source.setServiceExecution(execution);
                sourceRepository.save(source);
            }
        }

        period.setStatus(BillingPeriodStatus.CALCULATED);
        return periodRepository.save(period);
    }

    private record AccrualGroupKey(
        Long clientId,
        Long serviceId,
        Long tariffId,
        String unit
    ) {
        private AccrualGroupKey {
            Objects.requireNonNull(clientId);
            Objects.requireNonNull(serviceId);
            Objects.requireNonNull(tariffId);
            Objects.requireNonNull(unit);
        }
    }
}
