package com.example.hostel.serviceImpl;

import com.example.hostel.entity.User;
import com.example.hostel.entity.Role;
import com.example.hostel.repository.UserRepository;
import com.example.hostel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerStudent(User user) {
     
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.ROLE_STUDENT);
        }
        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<User> getAllStudents() {
        return userRepository.findAll();
    }
}