package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/billing-accruals")
public class BillingAccrualController {
    private final BillingAccrualRepository accrualRepository;

    public BillingAccrualController(BillingAccrualRepository accrualRepository) {
        this.accrualRepository = accrualRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<BillingAccrualResponse> list(@RequestParam(required = false) Long periodId) {
        List<BillingAccrual> accruals = periodId == null
            ? accrualRepository.findAllByOrderByCreatedAtDescIdDesc()
            : accrualRepository.findByBillingPeriodIdOrderByCreatedAtDescIdDesc(periodId);

        return accruals.stream()
            .map(BillingAccrualResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public BillingAccrualResponse get(@PathVariable Long id) {
        BillingAccrual accrual = accrualRepository.findWithSourcesById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billing accrual was not found"));

        List<BillingAccrualSourceResponse> sources = accrual.getSources().stream()
            .map(BillingAccrualSourceResponse::fromEntity)
            .toList();
        return BillingAccrualResponse.fromEntity(accrual, sources);
    }
}
