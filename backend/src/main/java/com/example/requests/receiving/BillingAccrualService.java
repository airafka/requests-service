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
import java.util.function.Function;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class BillingAccrualService {
    private static final String OWNER_CHANGE_SERVICE_NAME = "\u0421\u043c\u0435\u043d\u0430 \u0432\u043b\u0430\u0434\u0435\u043b\u044c\u0446\u0430";

    private final BillingPeriodRepository periodRepository;
    private final BillingAccrualRepository accrualRepository;
    private final BillingAccrualSourceRepository sourceRepository;
    private final ServiceExecutionRepository serviceExecutionRepository;
    private final TariffRepository tariffRepository;
    private final ContainerStoragePeriodRepository storagePeriodRepository;
    private final ReceivingOrderContainerRepository receivingOrderContainerRepository;
    private final TosOperationFactRepository tosOperationFactRepository;

    public BillingAccrualService(
        BillingPeriodRepository periodRepository,
        BillingAccrualRepository accrualRepository,
        BillingAccrualSourceRepository sourceRepository,
        ServiceExecutionRepository serviceExecutionRepository,
        TariffRepository tariffRepository,
        ContainerStoragePeriodRepository storagePeriodRepository,
        ReceivingOrderContainerRepository receivingOrderContainerRepository,
        TosOperationFactRepository tosOperationFactRepository
    ) {
        this.periodRepository = periodRepository;
        this.accrualRepository = accrualRepository;
        this.sourceRepository = sourceRepository;
        this.serviceExecutionRepository = serviceExecutionRepository;
        this.tariffRepository = tariffRepository;
        this.storagePeriodRepository = storagePeriodRepository;
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
        if (period.getClient() == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Billing period client was not selected");
        }

        List<ServiceExecution> executions = serviceExecutionRepository
            .findByStatusAndDateRangeOverlapOrderByDateFromAscIdAsc(
                ServiceExecutionStatus.CONFIRMED,
                period.getDateFrom(),
                period.getDateTo()
            )
            .stream()
            .filter(execution -> execution.getClient().getId().equals(period.getClient().getId()))
            .filter(execution -> !sourceRepository.existsByBillingPeriodIdAndServiceExecutionId(period.getId(), execution.getId()))
            .toList();

        List<BillableExecution> billableExecutions = executions.stream()
            .map(execution -> resolveBillableExecution(execution, period))
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

        if (billableExecutions.isEmpty()) {
            period.setStatus(BillingPeriodStatus.CALCULATED);
            return periodRepository.save(period);
        }

        Map<Long, BillableExecution> uniqueExecutions = billableExecutions.stream()
            .collect(Collectors.toMap(
                billableExecution -> billableExecution.execution().getId(),
                Function.identity(),
                (left, ignored) -> left,
                LinkedHashMap::new
            ));

        BigDecimal amount = BigDecimal.ZERO;
        BigDecimal quantityTotal = BigDecimal.ZERO;
        for (BillableExecution billableExecution : billableExecutions) {
            Tariff tariff = tariffsByServiceId.get(billableExecution.service().getId());
            BigDecimal unitPrice = tariff.getCost()
                .multiply(billableExecution.coefficient())
                .setScale(2, RoundingMode.HALF_UP);
            BigDecimal quantity = billableExecution.quantity();
            quantityTotal = quantityTotal.add(quantity);
            amount = amount.add(quantity.multiply(unitPrice));
        }

        BillingAccrual accrual = new BillingAccrual();
        accrual.setBillingPeriod(period);
        accrual.setClient(period.getClient());
        accrual.setQuantity(quantityTotal);
        accrual.setUnit("услуг");
        accrual.setUnitPrice(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP));
        accrual.setAmount(amount.setScale(2, RoundingMode.HALF_UP));
        accrual.setStatus(BillingAccrualStatus.CALCULATED);
        BillingAccrual saved = accrualRepository.saveAndFlush(accrual);

        for (BillableExecution billableExecution : uniqueExecutions.values()) {
            BillingAccrualSource source = new BillingAccrualSource();
            source.setBillingAccrual(saved);
            source.setBillingPeriod(period);
            source.setServiceExecution(billableExecution.execution());
            sourceRepository.save(source);
        }

        period.setStatus(BillingPeriodStatus.CALCULATED);
        return periodRepository.save(period);
    }

    private List<BillableExecution> resolveBillableExecution(ServiceExecution execution, BillingPeriod period) {
        if (isService(execution.getService(), OWNER_CHANGE_SERVICE_NAME)) {
            return List.of();
        }

        BigDecimal quantity = execution.getBasisType() == ServiceExecutionBasisType.STORAGE_PERIOD
            ? storageQuantityForBillingPeriod(execution, period)
            : BigDecimal.valueOf(execution.getQuantity());
        if (quantity.compareTo(BigDecimal.ZERO) <= 0) {
            return List.of();
        }

        BigDecimal coefficient = execution.getBasisType() == ServiceExecutionBasisType.STORAGE_PERIOD
            ? storageCoefficient(execution)
            : tosCoefficient(execution);
        return List.of(new BillableExecution(execution, execution.getService(), coefficient, quantity));
    }

    private BigDecimal storageCoefficient(ServiceExecution execution) {
        if (execution.getBasisType() != ServiceExecutionBasisType.STORAGE_PERIOD || execution.getBasisId() == null) {
            return BigDecimal.ONE;
        }

        return storagePeriodRepository.findById(execution.getBasisId())
            .filter(period -> period.getSourceType() == ContainerStorageSourceType.RECEIVING_ORDER)
            .map(ContainerStoragePeriod::getSourceId)
            .flatMap(receivingOrderContainerRepository::findWithReceivingOrderById)
            .map(ReceivingOrderContainer::getReceivingOrder)
            .map(ReceivingOrder::getComplexService)
            .map(ComplexService::getCoefficient)
            .orElse(BigDecimal.ONE);
    }

    private BigDecimal storageQuantityForBillingPeriod(ServiceExecution execution, BillingPeriod period) {
        LocalDate start = execution.getDateFrom().isAfter(period.getDateFrom())
            ? execution.getDateFrom()
            : period.getDateFrom();
        LocalDate executionEndInclusive = execution.getDateTo() == null
            ? period.getDateTo()
            : execution.getDateTo().minusDays(1);
        LocalDate end = executionEndInclusive.isBefore(period.getDateTo())
            ? executionEndInclusive
            : period.getDateTo();

        if (end.isBefore(start)) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(ChronoUnit.DAYS.between(start, end.plusDays(1)));
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

    private record BillableExecution(
        ServiceExecution execution,
        BillingService service,
        BigDecimal coefficient,
        BigDecimal quantity
    ) {
    }
}
