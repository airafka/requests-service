package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tos-operation-facts")
public class TosOperationFactController {
    private final TosOperationFactRepository factRepository;
    private final BillingOperationRepository operationRepository;
    private final ContainerRepository containerRepository;
    private final ReceivingOrderRepository receivingOrderRepository;
    private final ShippingOrderRepository shippingOrderRepository;

    public TosOperationFactController(
        TosOperationFactRepository factRepository,
        BillingOperationRepository operationRepository,
        ContainerRepository containerRepository,
        ReceivingOrderRepository receivingOrderRepository,
        ShippingOrderRepository shippingOrderRepository
    ) {
        this.factRepository = factRepository;
        this.operationRepository = operationRepository;
        this.containerRepository = containerRepository;
        this.receivingOrderRepository = receivingOrderRepository;
        this.shippingOrderRepository = shippingOrderRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<TosOperationFactResponse> list(
        @RequestParam(required = false) LocalDate date,
        @RequestParam(required = false) String containerNumber,
        @RequestParam(required = false) String operationCode,
        @RequestParam(required = false) TosOperationFactStatus status
    ) {
        return factRepository.findAllByOrderByOperationTimeDescIdDesc().stream()
            .filter(fact -> date == null || fact.getOperationTime().toLocalDate().equals(date))
            .filter(fact -> containerNumber == null || containsIgnoreCase(fact.getContainerNumber(), containerNumber))
            .filter(fact -> operationCode == null || containsIgnoreCase(fact.getOperationCode(), operationCode))
            .filter(fact -> status == null || fact.getStatus() == status)
            .map(TosOperationFactResponse::fromEntity)
            .toList();
    }

    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public TosOperationFactResponse create(@Valid @RequestBody CreateTosOperationFactDto dto) {
        TosOperationFact fact = new TosOperationFact();
        fact.setExternalId(blankToNull(dto.externalId()));
        fact.setOperationCode(dto.operationCode().trim());
        fact.setContainerNumber(dto.containerNumber().trim());
        fact.setOperationTime(dto.operationTime());
        fact.setQuantity(dto.quantity() == null ? 1 : dto.quantity());
        fact.setStatus(dto.status() == null ? TosOperationFactStatus.RECEIVED : dto.status());
        fact.setSourceSystem(blankToDefault(dto.sourceSystem(), "TOS"));
        fact.setRawPayload(dto.rawPayload());
        fact.setErrorMessage(blankToNull(dto.errorMessage()));

        operationRepository.findByNameIgnoreCase(dto.operationCode().trim()).ifPresent(fact::setOperation);
        containerRepository.findByNumberIgnoreCase(dto.containerNumber().trim()).ifPresent(fact::setContainer);
        if (dto.receivingOrderId() != null) {
            fact.setReceivingOrder(receivingOrderRepository.findById(dto.receivingOrderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown receiving order")));
        }
        if (dto.shippingOrderId() != null) {
            fact.setShippingOrder(shippingOrderRepository.findById(dto.shippingOrderId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown shipping order")));
        }

        return TosOperationFactResponse.fromEntity(factRepository.saveAndFlush(fact));
    }

    private boolean containsIgnoreCase(String source, String part) {
        return source != null && source.toLowerCase().contains(part.trim().toLowerCase());
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String blankToDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value.trim();
    }
}
