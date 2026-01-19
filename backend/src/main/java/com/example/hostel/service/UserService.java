package com.example.hostel.service;

import com.example.hostel.entity.User;
import java.util.List;

public interface UserService {
    User registerStudent(User user);
    User getUserByUsername(String username);
    List<User> getAllStudents();
}