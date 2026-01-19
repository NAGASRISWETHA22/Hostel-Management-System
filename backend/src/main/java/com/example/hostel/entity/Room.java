package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    private String roomNumber;

    private String type;
    
    @Column(name = "rent_amount")
    private Double rentAmount;

    private Integer capacity;
    
    private String status;

    @Column(name = "is_occupied")
    private Integer isOccupied = 0; 
}