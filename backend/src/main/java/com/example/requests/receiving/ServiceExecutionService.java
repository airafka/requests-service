package com.example.requests.receiving;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.time.LocalDate;
import java.util.List;

@Service
public class ServiceExecutionService {
    private final ServiceExecutionRepository executionRepository;
    private final ServiceExecutionSourceRepository sourceRepository;
    private final BillingServiceRepository billingServiceRepository;
    private final TosOperationFactRepository tosOperationFactRepository;
    private final ContainerStorageDailyAccrualRepository storageAccrualRepository;
    private final ContainerOwnerHistoryRepository ownerHistoryRepository;

    public ServiceExecutionService(
        ServiceExecutionRepository executionRepository,
        ServiceExecutionSourceRepository sourceRepository,
        BillingServiceRepository billingServiceRepository,
        TosOperationFactRepository tosOperationFactRepository,
        ContainerStorageDailyAccrualRepository storageAccrualRepository,
        ContainerOwnerHistoryRepository ownerHistoryRepository
    ) {
        this.executionRepository = executionRepository;
        this.sourceRepository = sourceRepository;
        this.billingServiceRepository = billingServiceRepository;
        this.tosOperationFactRepository = tosOperationFactRepository;
        this.storageAccrualRepository = storageAccrualRepository;
        this.ownerHistoryRepository = ownerHistoryRepository;
    }

    @Transactional
    public List<ServiceExecution> processTosEvents() {
        return tosOperationFactRepository
            .findByStatusInOrderByOperationTimeAscIdAsc(EnumSet.of(TosOperationFactStatus.RECEIVED, TosOperationFactStatus.PROCESSED))
            .stream()
            .flatMap(fact -> processTosEvent(fact).stream())
            .toList();
    }

    @Transactional
    public List<ServiceExecution> processStorageAccruals() {
        return storageAccrualRepository.findByStatusOrderByAccrualDateAscIdAsc(ContainerStorageDailyAccrualStatus.ACCRUED).stream()
            .map(this::createForStorageAccrual)
            .flatMap(List::stream)
            .toList();
    }

    @Transactional
    public List<ServiceExecution> processTosEvent(TosOperationFact fact) {
        if (fact.getContainer() == null) {
            return List.of();
        }

        ClientEntity client = resolveTosClient(fact);
        if (client == null) {
            return List.of();
        }

        BillingOperation operation = fact.getOperation();
        if (operation == null) {
            operation = billingServiceRepository.findAllByOrderByNameAsc().stream()
                .flatMap(service -> service.getOperations().stream())
                .filter(currentOperation -> currentOperation.getName().equalsIgnoreCase(fact.getOperationCode()))
                .findFirst()
                .orElse(null);
        }
        if (operation == null) {
            return List.of();
        }

        Long operationId = operation.getId();
        return billingServiceRepository.findAllByOrderByNameAsc().stream()
            .filter(service -> service.getOperations().stream().anyMatch(currentOperation -> currentOperation.getId().equals(operationId)))
            .map(service -> createForTosEvent(fact, client, service))
            .flatMap(List::stream)
            .toList();
    }

    @Transactional
    public List<ServiceExecution> createForStorageAccrual(ContainerStorageDailyAccrual accrual) {
        if (accrual.getService() == null || accrual.getStatus() != ContainerStorageDailyAccrualStatus.ACCRUED) {
            return List.of();
        }

        if (executionRepository.existsBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
            ServiceExecutionSourceType.SYSTEM,
            ServiceExecutionBasisType.STORAGE_DAILY_ACCRUAL,
            accrual.getId(),
            accrual.getService().getId(),
            accrual.getContainer().getId()
        )) {
            return List.of();
        }

        ServiceExecution execution = new ServiceExecution();
        execution.setClient(accrual.getClient());
        execution.setContainer(accrual.getContainer());
        execution.setContainerNumber(accrual.getContainerNumber());
        execution.setService(accrual.getService());
        execution.setExecutionType(ServiceExecutionType.CONTINUOUS);
        execution.setDateFrom(accrual.getAccrualDate());
        execution.setDateTo(accrual.getAccrualDate());
        execution.setQuantity(accrual.getQuantity() == null ? 1 : accrual.getQuantity());
        execution.setUnit("сутки");
        execution.setSourceType(ServiceExecutionSourceType.SYSTEM);
        execution.setBasisType(ServiceExecutionBasisType.STORAGE_DAILY_ACCRUAL);
        execution.setBasisId(accrual.getId());
        execution.setStatus(ServiceExecutionStatus.CONFIRMED);
        ServiceExecution saved = executionRepository.saveAndFlush(execution);
        addSource(saved, ServiceExecutionFactSourceType.STORAGE_DAILY_ACCRUAL, accrual.getId());
        return List.of(saved);
    }

    @Transactional
    public void cancelForStorageAccrual(ContainerStorageDailyAccrual accrual) {
        if (accrual.getService() == null) {
            return;
        }
        executionRepository.findBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
            ServiceExecutionSourceType.SYSTEM,
            ServiceExecutionBasisType.STORAGE_DAILY_ACCRUAL,
            accrual.getId(),
            accrual.getService().getId(),
            accrual.getContainer().getId()
        ).ifPresent(execution -> {
            execution.setStatus(ServiceExecutionStatus.CANCELLED);
            executionRepository.save(execution);
        });
    }

    @Transactional
    public List<ServiceExecution> createForServiceRequest(
        ContainerOwnerChangeOrder order,
        ContainerOwnerChangeOrderContainer link,
        ClientEntity client,
        BillingService service
    ) {
        if (executionRepository.existsBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
            ServiceExecutionSourceType.MANUAL,
            ServiceExecutionBasisType.SERVICE_REQUEST,
            order.getId(),
            service.getId(),
            link.getContainer().getId()
        )) {
            return List.of();
        }

        ServiceExecution execution = new ServiceExecution();
        execution.setClient(client);
        execution.setContainer(link.getContainer());
        execution.setContainerNumber(link.getContainer().getNumber());
        execution.setService(service);
        execution.setExecutionType(service.getServiceType() == BillingServiceType.CONTINUOUS
            ? ServiceExecutionType.CONTINUOUS
            : ServiceExecutionType.ONE_TIME);
        execution.setDateFrom(order.getServiceDate());
        execution.setDateTo(order.getServiceDate());
        execution.setQuantity(1);
        execution.setUnit(service.getServiceType() == BillingServiceType.CONTINUOUS ? "сутки" : "операция");
        execution.setSourceType(ServiceExecutionSourceType.MANUAL);
        execution.setBasisType(ServiceExecutionBasisType.SERVICE_REQUEST);
        execution.setBasisId(order.getId());
        execution.setStatus(ServiceExecutionStatus.CONFIRMED);
        ServiceExecution saved = executionRepository.saveAndFlush(execution);
        addSource(saved, ServiceExecutionFactSourceType.SERVICE_REQUEST, order.getId());
        return List.of(saved);
    }

    private List<ServiceExecution> createForTosEvent(
        TosOperationFact fact,
        ClientEntity client,
        BillingService service
    ) {
        if (executionRepository.existsBySourceTypeAndBasisTypeAndBasisIdAndServiceIdAndContainerId(
            ServiceExecutionSourceType.TOS,
            ServiceExecutionBasisType.TOS_OPERATION_FACT,
            fact.getId(),
            service.getId(),
            fact.getContainer().getId()
        )) {
            return List.of();
        }

        LocalDate operationDate = fact.getOperationTime().toLocalDate();
        ServiceExecution execution = new ServiceExecution();
        execution.setClient(client);
        execution.setContainer(fact.getContainer());
        execution.setContainerNumber(fact.getContainerNumber());
        execution.setService(service);
        execution.setExecutionType(ServiceExecutionType.ONE_TIME);
        execution.setDateFrom(operationDate);
        execution.setDateTo(operationDate);
        execution.setQuantity(fact.getQuantity() == null ? 1 : fact.getQuantity());
        execution.setUnit("операция");
        execution.setSourceType(ServiceExecutionSourceType.TOS);
        execution.setBasisType(ServiceExecutionBasisType.TOS_OPERATION_FACT);
        execution.setBasisId(fact.getId());
        execution.setStatus(ServiceExecutionStatus.CONFIRMED);
        ServiceExecution saved = executionRepository.saveAndFlush(execution);
        addSource(saved, ServiceExecutionFactSourceType.TOS_OPERATION_FACT, fact.getId());
        return List.of(saved);
    }

    private void addSource(
        ServiceExecution execution,
        ServiceExecutionFactSourceType sourceType,
        Long sourceId
    ) {
        if (sourceRepository.existsByServiceExecutionIdAndSourceTypeAndSourceId(execution.getId(), sourceType, sourceId)) {
            return;
        }

        ServiceExecutionSource source = new ServiceExecutionSource();
        source.setServiceExecution(execution);
        source.setSourceType(sourceType);
        source.setSourceId(sourceId);
        sourceRepository.save(source);
    }

    private ClientEntity resolveTosClient(TosOperationFact fact) {
        if (fact.getReceivingOrder() != null) {
            return fact.getReceivingOrder().getClient();
        }
        if (fact.getShippingOrder() != null) {
            return fact.getShippingOrder().getClient();
        }
        if (fact.getContainer() != null) {
            return ownerHistoryRepository.findByContainerIdAndValidToIsNull(fact.getContainer().getId())
                .map(ContainerOwnerHistory::getClient)
                .orElse(null);
        }
        return null;
    }
}
