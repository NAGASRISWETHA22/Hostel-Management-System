package com.example.hostel.controller;

import com.example.hostel.entity.Room;
import com.example.hostel.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Room Management", description = "Endpoints for managing hostel rooms")
@SecurityRequirement(name = "bearerAuth")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Operation(
            summary = "Add New Room",
            description = "Create a new room in the hostel. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Room added successfully",
                    content = @Content(schema = @Schema(implementation = Room.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error adding room",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @PostMapping
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        try {
            return ResponseEntity.ok(roomService.addRoom(room));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @Operation(
            summary = "Update Room Status",
            description = "Update the status of a room by ID. Status can be 'Available', 'Occupied', or 'Maintenance'. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Room status updated successfully",
                    content = @Content(schema = @Schema(implementation = Map.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error updating room status",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            roomService.updateRoomStatus(id, status);
            return ResponseEntity.ok(Map.of("message", "Status updated"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @Operation(
            summary = "Get All Rooms",
            description = "Retrieve a list of all rooms in the hostel. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved list of rooms",
                    content = @Content(schema = @Schema(implementation = Room.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @GetMapping
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }
}