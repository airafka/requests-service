package com.example.requests.receiving;

public record ClientResponse(Long id, String name) {
    static ClientResponse fromEntity(ClientEntity client) {
        return new ClientResponse(client.getId(), client.getName());
    }
}
