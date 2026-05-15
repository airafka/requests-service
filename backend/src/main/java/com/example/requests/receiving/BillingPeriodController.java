package com.example.requests.receiving;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/billing-periods")
public class BillingPeriodController {
    private final BillingPeriodRepository periodRepository;
    private final BillingAccrualService accrualService;

    public BillingPeriodController(
        BillingPeriodRepository periodRepository,
        BillingAccrualService accrualService
    ) {
        this.periodRepository = periodRepository;
        this.accrualService = accrualService;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<BillingPeriodResponse> list() {
        return periodRepository.findAllByOrderByDateFromDescIdDesc().stream()
            .map(BillingPeriodResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public BillingPeriodResponse get(@PathVariable Long id) {
        BillingPeriod period = periodRepository.findWithAccrualsById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billing period was not found"));

        List<BillingAccrualResponse> accruals = period.getAccruals().stream()
            .map(BillingAccrualResponse::fromEntity)
            .toList();
        return BillingPeriodResponse.fromEntity(period, accruals);
    }

    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public BillingPeriodResponse create(@Valid @RequestBody CreateBillingPeriodDto dto) {
        if (dto.dateFrom().isAfter(dto.dateTo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Period start date must be before end date");
        }
        if (periodRepository.existsByDateFromAndDateToAndStatusNot(dto.dateFrom(), dto.dateTo(), BillingPeriodStatus.CANCELLED)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Billing period already exists");
        }

        BillingPeriod period = new BillingPeriod();
        period.setName(dto.name() == null || dto.name().isBlank()
            ? "Период " + dto.dateFrom() + " — " + dto.dateTo()
            : dto.name().trim());
        period.setDateFrom(dto.dateFrom());
        period.setDateTo(dto.dateTo());
        period.setStatus(BillingPeriodStatus.DRAFT);
        return BillingPeriodResponse.fromEntity(periodRepository.save(period));
    }

    @PostMapping("/{id}/calculate")
    @Transactional
    public BillingPeriodResponse calculate(@PathVariable Long id) {
        return BillingPeriodResponse.fromEntity(accrualService.calculatePeriod(id));
    }

    @PostMapping("/{id}/close")
    @Transactional
    public BillingPeriodResponse close(@PathVariable Long id) {
        BillingPeriod period = periodRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billing period was not found"));

        if (period.getStatus() != BillingPeriodStatus.CALCULATED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only calculated period can be closed");
        }

        period.setStatus(BillingPeriodStatus.CLOSED);
        return BillingPeriodResponse.fromEntity(periodRepository.save(period));
    }
}

