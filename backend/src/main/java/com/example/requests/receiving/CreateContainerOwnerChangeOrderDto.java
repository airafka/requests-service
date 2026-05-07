package com.example.requests.receiving;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateContainerOwnerChangeOrderDto(
    @NotNull Long newClientId,
    @Size(max = 2000) String comment,
    @NotEmpty List<@NotNull Long> containerIds
) {
}
