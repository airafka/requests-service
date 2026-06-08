package com.example.requests.receiving;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/service-executions")
public class ServiceExecutionController {
    private final ServiceExecutionRepository executionRepository;
    private final ServiceExecutionService executionService;
    private final TosOperationFactRepository tosOperationFactRepository;
    private final ContainerStoragePeriodRepository storagePeriodRepository;

    public ServiceExecutionController(
        ServiceExecutionRepository executionRepository,
        ServiceExecutionService executionService,
        TosOperationFactRepository tosOperationFactRepository,
        ContainerStoragePeriodRepository storagePeriodRepository
    ) {
        this.executionRepository = executionRepository;
        this.executionService = executionService;
        this.tosOperationFactRepository = tosOperationFactRepository;
        this.storagePeriodRepository = storagePeriodRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<ServiceExecutionResponse> list() {
        return executionRepository.findAllByOrderByDateFromDescIdDesc().stream()
            .map(ServiceExecutionResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ServiceExecutionResponse get(@PathVariable Long id) {
        ServiceExecution execution = executionRepository.findWithSourcesById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service execution was not found"));

        List<ServiceExecutionSourceResponse> sources = execution.getSources().stream()
            .map(source -> ServiceExecutionSourceResponse.fromEntity(
                source,
                source.getSourceType() == ServiceExecutionFactSourceType.TOS_OPERATION_FACT
                    ? tosOperationFactRepository.findById(source.getSourceId()).orElse(null)
                    : null,
                source.getSourceType() == ServiceExecutionFactSourceType.STORAGE_PERIOD
                    ? storagePeriodRepository.findById(source.getSourceId()).orElse(null)
                    : null
            ))
            .toList();

        return ServiceExecutionResponse.fromEntity(execution, sources);
    }

    @PostMapping("/process-tos-events")
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public List<ServiceExecutionResponse> processTosEvents() {
        return executionService.processTosEvents().stream()
            .map(ServiceExecutionResponse::fromEntity)
            .toList();
    }

}
