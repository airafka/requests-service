package com.example.requests.receiving;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Service
public class TosOperationFactService {
    private final TosOperationFactRepository factRepository;
    private final ObjectMapper objectMapper;
    private final ServiceExecutionService serviceExecutionService;

    public TosOperationFactService(
        TosOperationFactRepository factRepository,
        ObjectMapper objectMapper,
        ServiceExecutionService serviceExecutionService
    ) {
        this.factRepository = factRepository;
        this.objectMapper = objectMapper;
        this.serviceExecutionService = serviceExecutionService;
    }

    @Transactional
    public void recordReceivingContainerFinished(ReceivingOrder order, ReceivingOrderContainer link, LocalDate actualDate) {
        TosOperationFact fact = baseFact(
            "receiving-container-finish:" + link.getId(),
            "CONTAINER_RECEIVED",
            link.getContainer(),
            startOfDay(actualDate)
        );
        fact.setReceivingOrder(order);
        fact.setRawPayload(rawPayload("receiving_container_finish", order.getId(), link.getId(), null, 1));
        serviceExecutionService.processTosEvent(factRepository.saveAndFlush(fact));
    }

    @Transactional
    public void recordReceivingServiceFinished(
        ReceivingOrder order,
        ReceivingOrderContainer link,
        BillingServiceExecution execution,
        int quantity,
        LocalDate actualDate
    ) {
        BillingOperation operation = execution.getService().getOperations().stream().findFirst().orElse(null);
        String operationCode = operation == null ? execution.getService().getName() : operation.getName();
        TosOperationFact fact = baseFact(
            "receiving-service-finish:" + link.getId() + ":" + execution.getService().getId() + ":" + quantity,
            operationCode,
            link.getContainer(),
            startOfDay(actualDate)
        );
        fact.setOperation(operation);
        fact.setReceivingOrder(order);
        fact.setRawPayload(rawPayload("receiving_service_finish", order.getId(), link.getId(), execution.getService().getId(), 1));
        serviceExecutionService.processTosEvent(factRepository.saveAndFlush(fact));
    }

    @Transactional
    public void recordShippingContainerFinished(ShippingOrder order, ShippingOrderContainer link, LocalDate actualDate) {
        TosOperationFact fact = baseFact(
            "shipping-container-finish:" + link.getId(),
            "CONTAINER_SHIPPED",
            link.getContainer(),
            startOfDay(actualDate)
        );
        fact.setShippingOrder(order);
        fact.setRawPayload(rawPayload("shipping_container_finish", order.getId(), link.getId(), null, 1));
        serviceExecutionService.processTosEvent(factRepository.saveAndFlush(fact));
    }

    private TosOperationFact baseFact(
        String externalId,
        String operationCode,
        ContainerEntity container,
        OffsetDateTime operationTime
    ) {
        TosOperationFact fact = new TosOperationFact();
        fact.setExternalId(externalId);
        fact.setOperationCode(operationCode);
        fact.setContainer(container);
        fact.setContainerNumber(container.getNumber());
        fact.setOperationTime(operationTime);
        fact.setQuantity(1);
        fact.setStatus(TosOperationFactStatus.PROCESSED);
        fact.setSourceSystem("TOS");
        return fact;
    }

    private ObjectNode rawPayload(String eventType, Long orderId, Long linkId, Long serviceId, int quantity) {
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("eventType", eventType);
        payload.put("orderId", orderId);
        payload.put("linkId", linkId);
        if (serviceId != null) {
            payload.put("serviceId", serviceId);
        }
        payload.put("quantity", quantity);
        return payload;
    }

    private OffsetDateTime startOfDay(LocalDate date) {
        return date.atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime();
    }
}
