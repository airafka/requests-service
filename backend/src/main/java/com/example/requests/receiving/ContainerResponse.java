package com.example.requests.receiving;

public record ContainerResponse(Long id, String number) {
    static ContainerResponse fromEntity(ContainerEntity container) {
        return new ContainerResponse(container.getId(), container.getNumber());
    }
}
