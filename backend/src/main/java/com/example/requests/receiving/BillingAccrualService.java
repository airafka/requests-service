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
    private static final String OWNER_CHANGE_SERVICE_NAME = "\u0421\u043c\u0435\u043d\u0430 \u0432\u043b\u0430\u0434\u0435\u043b\u044c\u0446\u0430";

    private final BillingPeriodRepository periodRepository;
    private final BillingAccrualRepository accrualRepository;
    private final BillingAccrualSourceRepository sourceRepository;
    private final ServiceExecutionRepository serviceExecutionRepository;
    private final TariffRepository tariffRepository;
    private final ContainerStorageDailyAccrualRepository storageAccrualRepository;
    private final ReceivingOrderContainerRepository receivingOrderContainerRepository;
    private final TosOperationFactRepository tosOperationFactRepository;

    public BillingAccrualService(
        BillingPeriodRepository periodRepository,
        BillingAccrualRepository accrualRepository,
        BillingAccrualSourceRepository sourceRepository,
        ServiceExecutionRepository serviceExecutionRepository,
        TariffRepository tariffRepository,
        ContainerStorageDailyAccrualRepository storageAccrualRepository,
        ReceivingOrderContainerRepository receivingOrderContainerRepository,
        TosOperationFactRepository tosOperationFactRepository
    ) {
        this.periodRepository = periodRepository;
        this.accrualRepository = accrualRepository;
        this.sourceRepository = sourceRepository;
        this.serviceExecutionRepository = serviceExecutionRepository;
        this.tariffRepository = tariffRepository;
        this.storageAccrualRepository = storageAccrualRepository;
        this.receivingOrderContainerRepository = receivingOrderContainerRepository;
        this.tosOperationFactRepository = tosOperationFactRepository;
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

        List<BillableExecution> billableExecutions = executions.stream()
            .map(this::resolveBillableExecution)
            .flatMap(List::stream)
            .toList();

        Map<Long, Tariff> tariffsByServiceId = new LinkedHashMap<>();
        List<String> missingTariffs = new ArrayList<>();

        for (BillableExecution billableExecution : billableExecutions) {
            Long serviceId = billableExecution.service().getId();
            if (tariffsByServiceId.containsKey(serviceId)) {
                continue;
            }

            // TODO: Add full tariff selection rules, coefficients, and progressive rates at the next stage.
            List<Tariff> tariffs = tariffRepository.findByServices_IdOrderByIdAsc(serviceId);
            if (tariffs.isEmpty()) {
                missingTariffs.add("service_execution #" + billableExecution.execution().getId() + ", service #" + serviceId);
                continue;
            }
            tariffsByServiceId.put(serviceId, tariffs.get(0));
        }

        if (!missingTariffs.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Tariff was not found for some service executions: " + String.join("; ", missingTariffs)
            );
        }

        Map<AccrualGroupKey, List<BillableExecution>> groups = new LinkedHashMap<>();
        for (BillableExecution billableExecution : billableExecutions) {
            Tariff tariff = tariffsByServiceId.get(billableExecution.service().getId());
            BigDecimal unitPrice = tariff.getCost()
                .multiply(billableExecution.coefficient())
                .setScale(2, RoundingMode.HALF_UP);
            AccrualGroupKey key = new AccrualGroupKey(
                billableExecution.execution().getClient().getId(),
                billableExecution.service().getId(),
                tariff.getId(),
                billableExecution.execution().getUnit(),
                unitPrice
            );
            groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(billableExecution);
        }

        for (List<BillableExecution> groupExecutions : groups.values()) {
            BillableExecution first = groupExecutions.get(0);
            Tariff tariff = tariffsByServiceId.get(first.service().getId());
            BigDecimal quantity = groupExecutions.stream()
                .map(billableExecution -> BigDecimal.valueOf(billableExecution.execution().getQuantity()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal unitPrice = tariff.getCost()
                .multiply(first.coefficient())
                .setScale(2, RoundingMode.HALF_UP);

            BillingAccrual accrual = new BillingAccrual();
            accrual.setBillingPeriod(period);
            accrual.setClient(first.execution().getClient());
            accrual.setService(first.service());
            accrual.setTariff(tariff);
            accrual.setQuantity(quantity);
            accrual.setUnit(first.execution().getUnit());
            accrual.setUnitPrice(unitPrice);
            accrual.setAmount(quantity.multiply(unitPrice).setScale(2, RoundingMode.HALF_UP));
            accrual.setStatus(BillingAccrualStatus.CALCULATED);
            BillingAccrual saved = accrualRepository.saveAndFlush(accrual);

            for (BillableExecution billableExecution : groupExecutions) {
                BillingAccrualSource source = new BillingAccrualSource();
                source.setBillingAccrual(saved);
                source.setBillingPeriod(period);
                source.setServiceExecution(billableExecution.execution());
                sourceRepository.save(source);
            }
        }

        period.setStatus(BillingPeriodStatus.CALCULATED);
        return periodRepository.save(period);
    }

    private List<BillableExecution> resolveBillableExecution(ServiceExecution execution) {
        if (isService(execution.getService(), OWNER_CHANGE_SERVICE_NAME)) {
            return List.of();
        }

        BigDecimal coefficient = execution.getBasisType() == ServiceExecutionBasisType.STORAGE_DAILY_ACCRUAL
            ? storageCoefficient(execution)
            : tosCoefficient(execution);
        return List.of(new BillableExecution(execution, execution.getService(), coefficient));
    }

    private BigDecimal storageCoefficient(ServiceExecution execution) {
        if (execution.getBasisType() != ServiceExecutionBasisType.STORAGE_DAILY_ACCRUAL || execution.getBasisId() == null) {
            return BigDecimal.ONE;
        }

        return storageAccrualRepository.findWithStoragePeriodById(execution.getBasisId())
            .map(ContainerStorageDailyAccrual::getStoragePeriod)
            .filter(period -> period.getSourceType() == ContainerStorageSourceType.RECEIVING_ORDER)
            .map(ContainerStoragePeriod::getSourceId)
            .flatMap(receivingOrderContainerRepository::findWithReceivingOrderById)
            .map(ReceivingOrderContainer::getReceivingOrder)
            .map(ReceivingOrder::getComplexService)
            .map(ComplexService::getCoefficient)
            .orElse(BigDecimal.ONE);
    }

    private BigDecimal tosCoefficient(ServiceExecution execution) {
        if (execution.getBasisType() != ServiceExecutionBasisType.TOS_OPERATION_FACT || execution.getBasisId() == null) {
            return BigDecimal.ONE;
        }

        return tosOperationFactRepository.findWithContextById(execution.getBasisId())
            .map(TosOperationFact::getReceivingOrder)
            .map(ReceivingOrder::getComplexService)
            .filter(complexService -> complexService.getItems().stream()
                .anyMatch(item -> item.getService().getId().equals(execution.getService().getId())))
            .map(ComplexService::getCoefficient)
            .orElse(BigDecimal.ONE);
    }

    private boolean isService(BillingService service, String name) {
        return service.getName().trim().equalsIgnoreCase(name);
    }

    private record AccrualGroupKey(
        Long clientId,
        Long serviceId,
        Long tariffId,
        String unit,
        BigDecimal unitPrice
    ) {
        private AccrualGroupKey {
            Objects.requireNonNull(clientId);
            Objects.requireNonNull(serviceId);
            Objects.requireNonNull(tariffId);
            Objects.requireNonNull(unit);
            Objects.requireNonNull(unitPrice);
        }
    }

    private record BillableExecution(
        ServiceExecution execution,
        BillingService service,
        BigDecimal coefficient
    ) {
    }
}
