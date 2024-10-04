package com.carrenta.repository;

import com.carrenta.entity.User;
import com.carrenta.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>  findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
