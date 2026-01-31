package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionId; // Stripe PaymentIntent ID
    private Double amount;
    
    private String status; // SUCCESS, FAILED, PENDING
    private LocalDateTime paymentDate;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;
}