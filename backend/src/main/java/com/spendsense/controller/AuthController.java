package com.spendsense.controller;

import com.spendsense.dto.LoginRequest;
import com.spendsense.dto.LoginResponse;
import com.spendsense.dto.RegisterRequest;
import com.spendsense.entity.User;
import com.spendsense.repository.UserRepository;
import com.spendsense.security.JwtUtil;
import com.spendsense.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {


        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("Email already exists");

        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        if(!encoder.matches(request.getPassword(), user.getPassword())){
            return ResponseEntity.badRequest().body("Invalid Credentials");
        }
        String token = jwtUtil.generateToken(user.getId(),user.getEmail());

        LoginResponse response = new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail()
        );
        return ResponseEntity.ok(response);
    }
}