package com.poly.carrentalplatformbackend.repositories;


import com.poly.carrentalplatformbackend.entities.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Integer> {

    List<Voiture> findByMarqueContains(String marque);



    @Query("SELECT v FROM Voiture v  WHERE v.statut = 'DISPONIBLE'")
    List<Voiture> findAvailableVoitures();


}
