package com.example.hostel.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rooms")
@Schema(description = "Room entity representing a hostel room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the room", example = "1")
    private Long id;

    @Column(name = "room_number")
    @Schema(description = "Room number", example = "101")
    private String roomNumber;

    @Schema(description = "Room type (e.g., Single, Double, Triple)", example = "Double")
    private String type;
    
    @Column(name = "rent_amount")
    @Schema(description = "Monthly rent amount", example = "5000.00")
    private Double rentAmount;

    @Schema(description = "Maximum capacity of the room", example = "2")
    private Integer capacity;
    
    @Schema(description = "Room status (Available, Occupied, Maintenance)", example = "Available")
    private String status;

    @Column(name = "is_occupied")
    @Schema(description = "Occupancy status (0 = Available, 1 = Occupied)", example = "0")
    private Integer isOccupied = 0; 
}