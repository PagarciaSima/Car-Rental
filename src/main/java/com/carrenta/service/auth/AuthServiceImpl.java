package com.carrenta.service.auth;

import com.carrenta.dto.SignupRequest;
import com.carrenta.dto.UserDto;
import com.carrenta.entity.User;
import com.carrenta.enums.UserRole;
import com.carrenta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;

    @Override
    public UserDto createUser(SignupRequest signupRequest, UserRole role) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(role);
        User createdUser = userRepository.save(user);

        return UserDto.convertUserToUserDto(createdUser);

    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
