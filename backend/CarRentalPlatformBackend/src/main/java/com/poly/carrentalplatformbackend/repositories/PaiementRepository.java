package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Integer> {
    Optional<Paiement> findByReservationIdReservation(int idReservation);
    boolean existsByReservationIdReservation(int idReservation);
}
