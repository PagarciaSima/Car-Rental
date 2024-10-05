package com.carrenta.controller;

import com.carrenta.dto.AuthenticationRequest;
import com.carrenta.dto.AuthenticationResponse;
import com.carrenta.dto.SignupRequest;
import com.carrenta.dto.UserDto;
import com.carrenta.entity.User;
import com.carrenta.enums.UserRole;
import com.carrenta.repository.UserRepository;
import com.carrenta.service.auth.AuthService;
import com.carrenta.service.jwt.UserService;
import com.carrenta.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @PostMapping("/signup/{role}")
    public ResponseEntity<?> signupUser(
            @RequestBody SignupRequest signupRequest,
            @PathVariable("role") String role
    ) {
        if (authService.hasCustomerWithEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("User already exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }

        UserRole userRole;
        if ("admin".equalsIgnoreCase(role)) {
            userRole = UserRole.ADMIN;
        } else if ("customer".equalsIgnoreCase(role)) {
            userRole = UserRole.CUSTOMER;
        } else {
            return new ResponseEntity<>("Invalid role specified", HttpStatus.BAD_REQUEST);
        }

        UserDto createdUserDto = authService.createUser(signupRequest, userRole);
        if (createdUserDto == null) {
            return new ResponseEntity<>("User not created, try again later", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
        throws BadCredentialsException, DisabledException, UsernameNotFoundException
    {
       try {
           authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                   authenticationRequest.getEmail(),
                   authenticationRequest.getPassword()));
       } catch (BadCredentialsException e) {
           throw new BadCredentialsException("Incorrect username or password");
       }
       final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;
    }
}
