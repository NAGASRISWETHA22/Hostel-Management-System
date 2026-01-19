package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users_table")
@Data // Ithu thaan romba mukkiyam! Getter and Setter-ah ithu automatic-ah create pannum.
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
    private Role role; // Neenga Role Enum use pannurathala UserController-la .toString() podanum

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}