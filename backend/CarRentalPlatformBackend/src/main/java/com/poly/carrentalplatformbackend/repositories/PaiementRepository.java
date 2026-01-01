package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Integer> {
}
