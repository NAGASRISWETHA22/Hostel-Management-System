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
        // ALWAYS Update/Create Admin to ensure credentials work
        userRepository.findByUsername("admin").ifPresentOrElse(
            admin -> {
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ROLE_ADMIN);
                admin.setEmail("admin@hostel.com");
                userRepository.save(admin);
                System.out.println(">>> Admin password updated to 'admin123'");
            },
            () -> {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEmail("admin@hostel.com");
                admin.setRole(Role.ROLE_ADMIN);
                userRepository.save(admin);
                System.out.println(">>> Admin user created with password 'admin123'");
            }
        );

        // Create Student if doesn't exist
        if (userRepository.findByUsername("student1").isEmpty()) {
            User student = new User();
            student.setUsername("student1");
            student.setPassword(passwordEncoder.encode("admin123"));
            student.setEmail("student@hostel.com");
            student.setRole(Role.ROLE_STUDENT);
            userRepository.save(student);
        }
        System.out.println(">>> Auth Setup Complete!");
    }
}