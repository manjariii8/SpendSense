package com.example.SpendSense.service;

import com.example.SpendSense.dto.LoginRequest;
import com.example.SpendSense.dto.LoginResponse;
import com.example.SpendSense.dto.RegisterRequest;
import com.example.SpendSense.entity.User;
import com.example.SpendSense.repository.UserRepository;
import com.example.SpendSense.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder;

    public String register(RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponse(
                jwtUtil.generateToken(user.getEmail()),
                user.getId()
        );
    }
}