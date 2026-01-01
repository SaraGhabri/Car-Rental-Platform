package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Role;
import com.poly.carrentalplatformbackend.entities.User;
import com.poly.carrentalplatformbackend.repositories.UserRepository;
import com.poly.carrentalplatformbackend.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {




    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private UserDetailsService userDetailsService;

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/login")
    public String login(@RequestBody AuthenticationRequest authenticationRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        return jwtService.generateToken(userDetails);


    }

    //REGISTER
    @PostMapping("/api/register")
    public User register(@RequestBody RegisterRequest req) {

        if (req.getUsername() == null || req.getUsername().isBlank())
            throw new IllegalArgumentException("username obligatoire");

        if (req.getPassword() == null || req.getPassword().isBlank())
            throw new IllegalArgumentException("password obligatoire");



        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .phone(req.getPhone())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }
}





@Data
class AuthenticationRequest{
    private String username;
    private String password;

}

@Data
class RegisterRequest {
    private String username;
    private String email;
    private String phone;
    private String password;
}