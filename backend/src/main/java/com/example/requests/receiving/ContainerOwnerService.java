package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ContainerOwnerService {
    private final ContainerOwnerHistoryRepository historyRepository;
    private final ContainerOwnerChangeOrderRepository changeOrderRepository;
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;
    private final BillingServiceRepository billingServiceRepository;
    private final ReceivingOrderContainerRepository receivingOrderContainerRepository;
    private final ShippingOrderContainerRepository shippingOrderContainerRepository;
    private final ContainerStorageService storageService;
    private final ServiceExecutionService serviceExecutionService;

    public ContainerOwnerService(
        ContainerOwnerHistoryRepository historyRepository,
        ContainerOwnerChangeOrderRepository changeOrderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository,
        BillingServiceRepository billingServiceRepository,
        ReceivingOrderContainerRepository receivingOrderContainerRepository,
        ShippingOrderContainerRepository shippingOrderContainerRepository,
        ContainerStorageService storageService,
        ServiceExecutionService serviceExecutionService
    ) {
        this.historyRepository = historyRepository;
        this.changeOrderRepository = changeOrderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
        this.billingServiceRepository = billingServiceRepository;
        this.receivingOrderContainerRepository = receivingOrderContainerRepository;
        this.shippingOrderContainerRepository = shippingOrderContainerRepository;
        this.storageService = storageService;
        this.serviceExecutionService = serviceExecutionService;
    }

    @Transactional
    public ContainerOwnerHistory createReceivingHistory(ReceivingOrder order, ReceivingOrderContainer link, LocalDate actualDate) {
        return historyRepository.findByOperationTypeAndSourceId(ContainerOwnerOperationType.RECEIVING, link.getId())
            .orElseGet(() -> {
                OffsetDateTime receivedAt = link.getFinishedAt() == null
                    ? startOfDay(actualDate)
                    : link.getFinishedAt();

                historyRepository.findByContainerIdAndValidToIsNull(link.getContainer().getId())
                    .ifPresent(active -> {
                        active.setValidTo(receivedAt);
                        historyRepository.saveAndFlush(active);
                    });

                ContainerOwnerHistory history = new ContainerOwnerHistory();
                history.setContainer(link.getContainer());
                history.setClient(order.getClient());
                history.setOperationType(ContainerOwnerOperationType.RECEIVING);
                history.setSourceId(link.getId());
                history.setValidFrom(receivedAt);
                history.setCreatedBy(currentUser());
                return historyRepository.save(history);
            });
    }

    @Transactional
    public void createShippingHistory(ShippingOrder order) {
        for (ShippingOrderContainer link : order.getContainers()) {
            if (historyRepository.existsByOperationTypeAndSourceId(ContainerOwnerOperationType.SHIPPING, link.getId())) {
                continue;
            }
            OffsetDateTime shippedAt = link.getFinishedAt() == null
                ? startOfDay(order.getActualShippingDate())
                : link.getFinishedAt();

            ContainerOwnerHistory active = historyRepository
                .findByContainerIdAndValidToIsNull(link.getContainer().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + link.getContainer().getNumber()
                ));

            if (!active.getClient().getId().equals(order.getClient().getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + link.getContainer().getNumber() + " does not belong to the selected client"
                );
            }

            active.setValidTo(shippedAt);
            historyRepository.saveAndFlush(active);

            ContainerOwnerHistory history = new ContainerOwnerHistory();
            history.setContainer(link.getContainer());
            history.setClient(order.getClient());
            history.setOperationType(ContainerOwnerOperationType.SHIPPING);
            history.setSourceId(link.getId());
            history.setValidFrom(shippedAt);
            history.setValidTo(shippedAt);
            history.setCreatedBy(currentUser());
            historyRepository.save(history);
        }
    }

    @Transactional
    public ContainerOwnerChangeOrder createChangeOrder(CreateContainerOwnerChangeOrderDto dto) {
        ClientEntity newClient = null;
        BillingService service = null;
        if (dto.requestType() == ServiceRequestType.OWNER_CHANGE) {
            validateOwnerChangeDate(dto.serviceDate());
            if (dto.newClientId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose new owner");
            }
            newClient = clientRepository.findById(dto.newClientId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown client"));
        } else {
            if (dto.serviceId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose service");
            }
            service = billingServiceRepository.findById(dto.serviceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown service"));
        }

        List<Long> requestedContainerIds = uniqueIds(dto.containerIds());
        if (requestedContainerIds.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose at least one container");
        }

        List<ContainerEntity> containers = containerRepository.findAllById(requestedContainerIds);
        Map<Long, ContainerEntity> containersById = containers.stream()
            .collect(Collectors.toMap(ContainerEntity::getId, Function.identity()));

        List<Long> missing = requestedContainerIds.stream()
            .filter(id -> !containersById.containsKey(id))
            .toList();
        if (!missing.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown containers: " + missing);
        }

        Map<Long, ContainerOwnerHistory> activeOwners = historyRepository
            .findByContainerIdInAndValidToIsNull(requestedContainerIds)
            .stream()
            .collect(Collectors.toMap(history -> history.getContainer().getId(), Function.identity()));

        for (Long containerId : requestedContainerIds) {
            ContainerEntity container = containersById.get(containerId);
            ContainerOwnerHistory activeOwner = activeOwners.get(containerId);
            if (activeOwner == null) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + container.getNumber()
                );
            }
            if (dto.requestType() == ServiceRequestType.OWNER_CHANGE && activeOwner.getClient().getId().equals(newClient.getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + container.getNumber() + " already belongs to the selected client"
                );
            }
        }

        ContainerOwnerChangeOrder order = new ContainerOwnerChangeOrder();
        order.setNumber(nextChangeOrderNumber());
        order.setRequestType(dto.requestType());
        order.setService(service);
        order.setServiceDate(dto.serviceDate());
        order.setNewClient(newClient);
        order.setStatus(ContainerOwnerChangeOrderStatus.COMPLETED);
        order.setComment(dto.comment());
        order.setCreatedBy(currentUser());
        requestedContainerIds.forEach(containerId -> order.addContainer(containersById.get(containerId)));

        ContainerOwnerChangeOrder saved = changeOrderRepository.saveAndFlush(order);
        if (saved.getRequestType() == ServiceRequestType.OWNER_CHANGE) {
            applyOwnerChange(saved, startOfDay(saved.getServiceDate()));
        } else {
            createServiceExecutions(saved);
        }
        return saved;
    }

    @Transactional
    public ContainerOwnerChangeOrder completeChangeOrder(Long id) {
        ContainerOwnerChangeOrder order = loadChangeOrder(id);
        if (order.getRequestType() == ServiceRequestType.OWNER_CHANGE) {
            validateOwnerChangeDate(order.getServiceDate());
        }

        if (order.getStatus() != ContainerOwnerChangeOrderStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only draft owner change orders can be completed");
        }
        if (order.getContainers().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose at least one container");
        }
        if (order.getRequestType() == ServiceRequestType.SERVICE) {
            createServiceExecutions(order);
            order.setStatus(ContainerOwnerChangeOrderStatus.COMPLETED);
            order.setCompletedAt(startOfDay(order.getServiceDate()));
            order.setCompletedBy(currentUser());
            return changeOrderRepository.save(order);
        }

        OffsetDateTime now = startOfDay(order.getServiceDate());
        for (ContainerOwnerChangeOrderContainer link : order.getContainers()) {
            ContainerOwnerHistory active = historyRepository
                .findByContainerIdAndValidToIsNull(link.getContainer().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + link.getContainer().getNumber()
                ));

            if (active.getClient().getId().equals(order.getNewClient().getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + link.getContainer().getNumber() + " already belongs to the selected client"
                );
            }

            active.setValidTo(now);
            historyRepository.saveAndFlush(active);

            ContainerOwnerHistory next = new ContainerOwnerHistory();
            next.setContainer(link.getContainer());
            next.setClient(order.getNewClient());
            next.setOperationType(ContainerOwnerOperationType.OWNER_CHANGE);
            next.setSourceId(order.getId());
            next.setValidFrom(now);
            next.setCreatedBy(currentUser());
            ContainerOwnerHistory savedNext = historyRepository.save(next);

            storageService.closeStoragePeriodForOwnerChange(link.getContainer(), order.getServiceDate());
            storageService.openStoragePeriod(
                link.getContainer(),
                order.getNewClient(),
                order.getServiceDate(),
                ContainerStorageSourceType.OWNER_CHANGE_ORDER,
                order.getId(),
                savedNext
            );
        }

        order.setStatus(ContainerOwnerChangeOrderStatus.COMPLETED);
        order.setCompletedAt(now);
        order.setCompletedBy(currentUser());
        return changeOrderRepository.save(order);
    }

    private void createServiceExecutions(ContainerOwnerChangeOrder order) {
        if (order.getService() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose service");
        }

        for (ContainerOwnerChangeOrderContainer link : order.getContainers()) {
            ContainerOwnerHistory active = historyRepository
                .findByContainerIdAndValidToIsNull(link.getContainer().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + link.getContainer().getNumber()
                ));
            serviceExecutionService.createForServiceRequest(order, link, active.getClient(), order.getService());
        }

        order.setCompletedAt(startOfDay(order.getServiceDate()));
        order.setCompletedBy(currentUser());
    }

    @Transactional
    public ContainerOwnerChangeOrder cancelChangeOrder(Long id) {
        ContainerOwnerChangeOrder order = loadChangeOrder(id);
        if (order.getStatus() != ContainerOwnerChangeOrderStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only draft owner change orders can be cancelled");
        }

        order.setStatus(ContainerOwnerChangeOrderStatus.CANCELLED);
        return changeOrderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public ContainerOwnerResponse getCurrentOwner(Long containerId) {
        ContainerOwnerHistory history = historyRepository.findByContainerIdAndValidToIsNull(containerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Current owner was not found"));
        return ContainerOwnerResponse.fromEntity(history);
    }

    @Transactional(readOnly = true)
    public List<CurrentContainerOwnerResponse> getCurrentOwners() {
        return historyRepository.findAllByValidToIsNullOrderByContainer_NumberAsc().stream()
            .map(CurrentContainerOwnerResponse::fromEntity)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ContainerOwnerHistoryResponse> getOwnerHistory(Long containerId) {
        return historyRepository.findAllByContainerIdOrderByValidFromDescIdDesc(containerId).stream()
            .map(this::toHistoryResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ContainerOwnerHistoryResponse> getAllOwnerHistory() {
        return historyRepository.findAllByOrderByValidFromDescIdDesc().stream()
            .map(this::toHistoryResponse)
            .toList();
    }

    private ContainerOwnerHistoryResponse toHistoryResponse(ContainerOwnerHistory history) {
        String sourceNumber = sourceNumber(history);
        Long sourceOrderId = sourceOrderId(history);
        String sourceLabel = switch (history.getOperationType()) {
            case RECEIVING -> sourceNumber == null ? "Receiving" : "Receiving " + sourceNumber;
            case SHIPPING -> sourceNumber == null ? "Shipping" : "Shipping " + sourceNumber;
            case OWNER_CHANGE -> sourceNumber == null ? "Owner change" : "Owner change " + sourceNumber;
        };

        return new ContainerOwnerHistoryResponse(
            history.getId(),
            history.getContainer().getId(),
            ClientResponse.fromEntity(history.getClient()),
            history.getOperationType(),
            history.getSourceId(),
            sourceOrderId,
            sourceNumber,
            sourceLabel,
            history.getValidFrom(),
            history.getValidTo(),
            history.getStorageDays(),
            history.getCreatedAt(),
            history.getCreatedBy()
        );
    }

    @Transactional(readOnly = true)
    public void validateContainersBelongToClient(List<ContainerEntity> containers, ClientEntity client) {
        List<Long> containerIds = containers.stream()
            .map(ContainerEntity::getId)
            .toList();

        Map<Long, ContainerOwnerHistory> activeOwners = historyRepository
            .findByContainerIdInAndValidToIsNull(containerIds)
            .stream()
            .collect(Collectors.toMap(history -> history.getContainer().getId(), Function.identity()));

        for (ContainerEntity container : containers) {
            ContainerOwnerHistory activeOwner = activeOwners.get(container.getId());
            if (activeOwner == null) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + container.getNumber()
                );
            }
            if (!activeOwner.getClient().getId().equals(client.getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + container.getNumber() + " does not belong to the selected client"
                );
            }
        }
    }

    private String sourceNumber(ContainerOwnerHistory history) {
        if (history.getOperationType() == ContainerOwnerOperationType.RECEIVING) {
            return receivingOrderContainerRepository.findWithReceivingOrderById(history.getSourceId())
                .map(link -> link.getReceivingOrder().getNumber())
                .orElse(null);
        }

        if (history.getOperationType() == ContainerOwnerOperationType.SHIPPING) {
            return shippingOrderContainerRepository.findWithShippingOrderById(history.getSourceId())
                .map(link -> link.getShippingOrder().getNumber())
                .orElse(null);
        }

        return changeOrderRepository.findById(history.getSourceId())
            .map(ContainerOwnerChangeOrder::getNumber)
            .orElse(null);
    }

    private Long sourceOrderId(ContainerOwnerHistory history) {
        if (history.getOperationType() == ContainerOwnerOperationType.RECEIVING) {
            return receivingOrderContainerRepository.findWithReceivingOrderById(history.getSourceId())
                .map(link -> link.getReceivingOrder().getId())
                .orElse(null);
        }

        if (history.getOperationType() == ContainerOwnerOperationType.SHIPPING) {
            return shippingOrderContainerRepository.findWithShippingOrderById(history.getSourceId())
                .map(link -> link.getShippingOrder().getId())
                .orElse(null);
        }

        return history.getSourceId();
    }

    private ContainerOwnerChangeOrder loadChangeOrder(Long id) {
        return changeOrderRepository.findWithContainersById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner change order was not found"));
    }

    private void applyOwnerChange(ContainerOwnerChangeOrder order, OffsetDateTime completedAt) {
        for (ContainerOwnerChangeOrderContainer link : order.getContainers()) {
            ContainerOwnerHistory active = historyRepository
                .findByContainerIdAndValidToIsNull(link.getContainer().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current owner was not found for container " + link.getContainer().getNumber()
                ));

            if (active.getClient().getId().equals(order.getNewClient().getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + link.getContainer().getNumber() + " already belongs to the selected client"
                );
            }

            active.setValidTo(completedAt);
            historyRepository.saveAndFlush(active);

            ContainerOwnerHistory next = new ContainerOwnerHistory();
            next.setContainer(link.getContainer());
            next.setClient(order.getNewClient());
            next.setOperationType(ContainerOwnerOperationType.OWNER_CHANGE);
            next.setSourceId(order.getId());
            next.setValidFrom(completedAt);
            next.setCreatedBy(currentUser());
            ContainerOwnerHistory savedNext = historyRepository.save(next);

            storageService.closeStoragePeriodForOwnerChange(link.getContainer(), order.getServiceDate());
            storageService.openStoragePeriod(
                link.getContainer(),
                order.getNewClient(),
                order.getServiceDate(),
                ContainerStorageSourceType.OWNER_CHANGE_ORDER,
                order.getId(),
                savedNext
            );
        }

        order.setCompletedAt(completedAt);
        order.setCompletedBy(currentUser());
    }

    private List<Long> uniqueIds(List<Long> ids) {
        Set<Long> unique = new LinkedHashSet<>(ids);
        if (unique.size() != ids.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Container can be selected only once");
        }
        return List.copyOf(unique);
    }

    private void validateOwnerChangeDate(LocalDate changeDate) {
        if (changeDate.isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Смена владельца задним числом недоступна");
        }
    }

    private String nextChangeOrderNumber() {
        return String.valueOf(changeOrderRepository.findMaxNumericNumber() + 1);
    }

    private String currentUser() {
        return "system";
    }

    private OffsetDateTime startOfDay(LocalDate date) {
        return date.atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime();
    }

}
