package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
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
    private final ReceivingOrderContainerRepository receivingOrderContainerRepository;

    public ContainerOwnerService(
        ContainerOwnerHistoryRepository historyRepository,
        ContainerOwnerChangeOrderRepository changeOrderRepository,
        ContainerRepository containerRepository,
        ClientRepository clientRepository,
        ReceivingOrderContainerRepository receivingOrderContainerRepository
    ) {
        this.historyRepository = historyRepository;
        this.changeOrderRepository = changeOrderRepository;
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
        this.receivingOrderContainerRepository = receivingOrderContainerRepository;
    }

    @Transactional
    public void createReceivingHistory(ReceivingOrder order) {
        OffsetDateTime now = OffsetDateTime.now();
        for (ReceivingOrderContainer link : order.getContainers()) {
            historyRepository.findByContainerIdAndValidToIsNull(link.getContainer().getId())
                .ifPresent(active -> {
                    throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Контейнер " + active.getContainer().getNumber() + " уже имеет владельца: " + active.getClient().getName()
                    );
                });

            ContainerOwnerHistory history = new ContainerOwnerHistory();
            history.setContainer(link.getContainer());
            history.setClient(order.getClient());
            history.setOperationType(ContainerOwnerOperationType.RECEIVING);
            history.setSourceId(link.getId());
            history.setValidFrom(order.getCreatedAt() == null ? now : order.getCreatedAt());
            history.setCreatedBy(currentUser());
            historyRepository.save(history);
        }
    }

    @Transactional
    public ContainerOwnerChangeOrder createChangeOrder(CreateContainerOwnerChangeOrderDto dto) {
        ClientEntity newClient = clientRepository.findById(dto.newClientId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown client"));

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
            if (activeOwner.getClient().getId().equals(newClient.getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Container " + container.getNumber() + " already belongs to the selected client"
                );
            }
        }

        ContainerOwnerChangeOrder order = new ContainerOwnerChangeOrder();
        order.setNumber(nextChangeOrderNumber());
        order.setNewClient(newClient);
        order.setStatus(ContainerOwnerChangeOrderStatus.DRAFT);
        order.setComment(dto.comment());
        order.setCreatedBy(currentUser());
        requestedContainerIds.forEach(containerId -> order.addContainer(containersById.get(containerId)));

        return changeOrderRepository.save(order);
    }

    @Transactional
    public ContainerOwnerChangeOrder completeChangeOrder(Long id) {
        ContainerOwnerChangeOrder order = loadChangeOrder(id);
        if (order.getStatus() != ContainerOwnerChangeOrderStatus.DRAFT) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only draft owner change orders can be completed");
        }
        if (order.getContainers().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose at least one container");
        }

        OffsetDateTime now = OffsetDateTime.now();
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
            historyRepository.save(next);
        }

        order.setStatus(ContainerOwnerChangeOrderStatus.COMPLETED);
        order.setCompletedAt(now);
        order.setCompletedBy(currentUser());
        return changeOrderRepository.save(order);
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
        return historyRepository.findAllByContainerIdOrderByValidFromAscIdAsc(containerId).stream()
            .map(this::toHistoryResponse)
            .toList();
    }

    private ContainerOwnerHistoryResponse toHistoryResponse(ContainerOwnerHistory history) {
        String sourceNumber = sourceNumber(history);
        String sourceLabel = switch (history.getOperationType()) {
            case RECEIVING -> sourceNumber == null ? "Receiving" : "Receiving " + sourceNumber;
            case OWNER_CHANGE -> sourceNumber == null ? "Owner change" : "Owner change " + sourceNumber;
        };

        return new ContainerOwnerHistoryResponse(
            history.getContainer().getId(),
            ClientResponse.fromEntity(history.getClient()),
            history.getOperationType(),
            history.getSourceId(),
            sourceNumber,
            sourceLabel,
            history.getValidFrom(),
            history.getValidTo(),
            history.getCreatedAt(),
            history.getCreatedBy()
        );
    }

    private String sourceNumber(ContainerOwnerHistory history) {
        if (history.getOperationType() == ContainerOwnerOperationType.RECEIVING) {
            return receivingOrderContainerRepository.findWithReceivingOrderById(history.getSourceId())
                .map(link -> link.getReceivingOrder().getNumber())
                .orElse(null);
        }

        return changeOrderRepository.findById(history.getSourceId())
            .map(ContainerOwnerChangeOrder::getNumber)
            .orElse(null);
    }

    private ContainerOwnerChangeOrder loadChangeOrder(Long id) {
        return changeOrderRepository.findWithContainersById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Owner change order was not found"));
    }

    private List<Long> uniqueIds(List<Long> ids) {
        Set<Long> unique = new LinkedHashSet<>(ids);
        if (unique.size() != ids.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Container can be selected only once");
        }
        return List.copyOf(unique);
    }

    private String nextChangeOrderNumber() {
        String number;
        do {
            number = "OC-" + (System.currentTimeMillis() % 1_000_000_000L);
        } while (changeOrderRepository.existsByNumberIgnoreCase(number));
        return number;
    }

    private String currentUser() {
        return "system";
    }
}
