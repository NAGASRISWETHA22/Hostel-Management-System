package com.example.hostel.config;

import com.example.hostel.entity.Role;
import com.example.hostel.entity.User;
import com.example.hostel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create Admin if doesn't exist
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); 
            admin.setEmail("admin@hostel.com");
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
        }

        // Create Student if doesn't exist
        if (userRepository.findByUsername("student1").isEmpty()) {
            User student = new User();
            student.setUsername("student1");
            student.setPassword(passwordEncoder.encode("admin123")); 
            student.setEmail("student@hostel.com");
            student.setRole(Role.ROLE_STUDENT);
            userRepository.save(student);
        }
        System.out.println(">>> Auth Setup Complete: admin/admin123 and student1/admin123 are ready!");
    }
}