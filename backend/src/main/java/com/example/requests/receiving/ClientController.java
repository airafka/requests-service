package com.example.requests.receiving;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientRepository repository;

    public ClientController(ClientRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ClientResponse> list() {
        return repository.findAllByOrderByNameAsc().stream()
            .map(ClientResponse::fromEntity)
            .toList();
    }
}
