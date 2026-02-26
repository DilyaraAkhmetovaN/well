package com.wellness.dto;

import com.wellness.entity.Role;
import jakarta.validation.constraints.*;

public class AuthDtos {
    public record RegisterRequest(
            @Email @NotBlank String email,
            @NotBlank @Size(min = 6, max = 64) String password,
            @NotBlank @Size(min = 2, max = 100) String fullName
    ) {}

    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    public record AuthResponse(String token, Long userId, String email, String fullName, Role role) {}

    public record ResetPasswordRequest(
            @Email @NotBlank String email,
            @NotBlank @Size(min = 6, max = 64) String newPassword
    ) {}
}
