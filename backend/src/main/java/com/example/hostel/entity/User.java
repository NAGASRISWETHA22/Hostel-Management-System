package com.example.hostel.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User entity representing a student or admin in the hostel system")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the user", example = "1")
    private Long id;

    @Column(unique = true, nullable = false)
    @Schema(description = "Unique username for login", example = "john_doe")
    private String username;

    @Column(nullable = false)
    @Schema(description = "Encrypted password", example = "encrypted_password", accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;

    @Column(unique = true, nullable = false)
    @Schema(description = "User email address", example = "john.doe@example.com")
    private String email;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 20)
    @Schema(description = "User role (ROLE_STUDENT or ROLE_ADMIN)", example = "ROLE_STUDENT")
    private Role role;

    @Schema(description = "User phone number", example = "+1234567890")
    private String phoneNumber;

    // Initially signup pannum pothu room assign aagathu,
    // so idhai optional-aa vechikalaam
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = true)
    @Schema(description = "Assigned room (optional, can be null initially)")
    private Room room;
}