package com.example.requests.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateRequestDto(
    @NotBlank @Size(max = 160) String title,
    @NotBlank String description,
    @NotBlank @Size(max = 120) String requesterName,
    @NotBlank @Email @Size(max = 160) String requesterEmail
) {
}
