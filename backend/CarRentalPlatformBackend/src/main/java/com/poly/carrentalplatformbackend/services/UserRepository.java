package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
