package com.carrenta.dto;

import com.carrenta.entity.User;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private String userRole;

    public static UserDto convertUserToUserDto(User createdUser) {
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setName(createdUser.getName());
        userDto.setEmail(createdUser.getEmail());
        userDto.setUserRole(
                createdUser.getUserRole() != null ? createdUser.getUserRole().name() : null
        );
        return userDto;
    }
}
