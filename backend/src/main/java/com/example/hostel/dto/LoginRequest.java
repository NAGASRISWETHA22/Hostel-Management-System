package com.example.hostel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Login request containing username and password")
public class LoginRequest {
    
    @Schema(description = "Username for login", example = "admin", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;
    
    @Schema(description = "Password for login", example = "admin123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;
    
}