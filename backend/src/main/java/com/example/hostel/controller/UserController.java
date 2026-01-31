package com.example.hostel.controller;

import com.example.hostel.entity.User;
import com.example.hostel.repository.UserRepository;
import com.example.hostel.service.UserService;
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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users") 
@RequestMapping("/api/users") 
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "User Management", description = "Endpoints for managing users and students")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Operation(
            summary = "Get All Students",
            description = "Retrieve a list of all students. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved list of students",
                    content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal server error",
                    content = @Content
            )
    })
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        try {
            List<User> allUsers = userRepository.findAll();
    
            System.out.println("Total Users in DB: " + allUsers.size());

            List<User> students = allUsers.stream()
                    .filter(user -> user.getRole() != null &&
                            user.getRole().toString().contains("STUDENT"))
                    .collect(Collectors.toList());

            System.out.println("Filtered Students: " + students.size());
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(
            summary = "Register New Student",
            description = "Register a new student user. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Student registered successfully",
                    content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerStudent(user));
    }

    @Operation(
            summary = "Delete Student",
            description = "Delete a student by ID. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Student deleted successfully",
                    content = @Content(schema = @Schema(implementation = String.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Student not found",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("Student deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
    @Operation(
            summary = "Get User by Username",
            description = "Retrieve user details by username. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User found",
                    content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "User not found",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
