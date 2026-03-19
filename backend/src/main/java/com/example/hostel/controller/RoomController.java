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

    // Room add pandrathuku
    @PostMapping
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        try {
            return ResponseEntity.ok(roomService.addRoom(room));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Payment status update panna (404 error fix pandrathuku)
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
