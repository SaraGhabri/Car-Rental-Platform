package com.poly.carrentalplatformbackend;

import com.poly.carrentalplatformbackend.entities.Role;
import com.poly.carrentalplatformbackend.entities.User;
import com.poly.carrentalplatformbackend.services.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class CarRentalPlatformBackendApplication {





	//@Bean
	/*CommandLineRunner runner(UserRepository userRepository) {
		return args -> {

			// éviter duplication à chaque redémarrage

				userRepository.save(User.builder()
						.name("aziz")
						.email("aziz@gmail.com")
						.phone("12345678")
						.password(passwordEncoder().encode("1234"))
						.role(Role.ADMIN)
						.build());



				userRepository.save(User.builder()
						.name("mohamed")
						.email("mohamed@gmail.com")
						.phone("87654321")
						.password(passwordEncoder().encode("4321"))
						.role(Role.USER)
						.build());

		};
	}*/

	public static void main(String[] args) {
		SpringApplication.run(CarRentalPlatformBackendApplication.class, args);
	}

}
