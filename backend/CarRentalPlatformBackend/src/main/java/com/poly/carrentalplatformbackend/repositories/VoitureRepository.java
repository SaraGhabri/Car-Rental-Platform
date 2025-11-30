package com.poly.carrentalplatformbackend.repositories;


import com.poly.carrentalplatformbackend.entities.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Integer> {

    List<Voiture> findByMarqueContains(String marque);

}
