package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username) throws UsernameNotFoundException;
}
