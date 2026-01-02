package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.Reservation;
import com.poly.carrentalplatformbackend.entities.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByUserId(int id);

    // Pour client / liste publique : exclure CANCELLED
    List<Reservation> findByUserUsernameAndStatusNot(
            String username,
            ReservationStatus status
    );




}
