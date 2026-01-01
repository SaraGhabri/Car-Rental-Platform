package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Voiture;
import com.poly.carrentalplatformbackend.entities.VoitureStatus;

import java.util.Date;
import java.util.List;


public interface VoitureService {

    Voiture ajouterVoiture(Voiture v);
    Voiture updateVoiture(Voiture v);
    void deleteVoiture(int id);
    List<Voiture> getAllVoitures();
    List<Voiture> getVoitureBMC(String nom);
    List<Voiture> findAvailableVoitures();

    void updateStatut(int idVoiture, VoitureStatus statut);
}
