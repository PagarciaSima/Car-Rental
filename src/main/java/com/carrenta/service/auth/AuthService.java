package com.carrenta.service.auth;

import com.carrenta.dto.SignupRequest;
import com.carrenta.dto.UserDto;
import com.carrenta.enums.UserRole;

public interface AuthService {
    public UserDto createUser(SignupRequest signupRequest, UserRole role);
    boolean hasCustomerWithEmail(String email);

}
