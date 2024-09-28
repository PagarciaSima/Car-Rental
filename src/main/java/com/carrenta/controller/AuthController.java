package com.carrenta.controller;

import com.carrenta.dto.SignupRequest;
import com.carrenta.dto.UserDto;
import com.carrenta.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest){
        if (authService.hasCustomerWithEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Customer already exist with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createdCustomerDto = authService.createCustomer(signupRequest);

        if(createdCustomerDto == null) {
            return new ResponseEntity<>("Customer not created, try again later", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);
    }
}
