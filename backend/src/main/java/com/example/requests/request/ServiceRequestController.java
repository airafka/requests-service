package com.example.requests.request;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {
    private final ServiceRequestRepository repository;

    public ServiceRequestController(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ServiceRequest> list() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceRequest create(@Valid @RequestBody CreateRequestDto dto) {
        ServiceRequest request = new ServiceRequest();
        request.setTitle(dto.title());
        request.setDescription(dto.description());
        request.setRequesterName(dto.requesterName());
        request.setRequesterEmail(dto.requesterEmail());
        return repository.save(request);
    }

    @GetMapping("/{id}")
    public ServiceRequest get(@PathVariable Long id) {
        return findRequest(id);
    }

    @PatchMapping("/{id}/status")
    public ServiceRequest updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateStatusDto dto) {
        ServiceRequest request = findRequest(id);
        request.setStatus(dto.status());
        return repository.save(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found");
        }
        repository.deleteById(id);
    }

    private ServiceRequest findRequest(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));
    }
}
