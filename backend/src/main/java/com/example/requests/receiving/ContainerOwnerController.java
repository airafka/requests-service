package com.example.requests.receiving;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/containers")
public class ContainerOwnerController {
    private final ContainerOwnerService service;

    public ContainerOwnerController(ContainerOwnerService service) {
        this.service = service;
    }

    @GetMapping("/{id}/owner")
    public ContainerOwnerResponse currentOwner(@PathVariable Long id) {
        return service.getCurrentOwner(id);
    }

    @GetMapping("/owners/current")
    public List<CurrentContainerOwnerResponse> currentOwners() {
        return service.getCurrentOwners();
    }

    @GetMapping("/owners/history")
    public List<ContainerOwnerHistoryResponse> allOwnerHistory() {
        return service.getAllOwnerHistory();
    }

    @GetMapping("/{id}/owner-history")
    public List<ContainerOwnerHistoryResponse> ownerHistory(@PathVariable Long id) {
        return service.getOwnerHistory(id);
    }

}
