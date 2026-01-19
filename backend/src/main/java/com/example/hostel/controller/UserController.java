package com.example.hostel.controller;

import com.example.hostel.entity.User;
import com.example.hostel.repository.UserRepository;
import com.example.hostel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users") // Path prefix: /api/users
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // Student list-ah fetch panna
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        try {
            List<User> allUsers = userRepository.findAll();
            // Console-la check panna:
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

    // Puthu student register panna
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerStudent(user));
    }

    // Student-ah delete panna
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("Student deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}