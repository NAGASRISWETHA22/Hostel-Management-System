package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role; 
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
