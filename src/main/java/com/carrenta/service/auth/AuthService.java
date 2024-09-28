package com.carrenta.service.auth;

import com.carrenta.dto.SignupRequest;
import com.carrenta.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);
}
