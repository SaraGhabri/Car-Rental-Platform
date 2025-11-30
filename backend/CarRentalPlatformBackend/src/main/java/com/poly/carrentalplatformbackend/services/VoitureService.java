package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Voiture;

import java.util.List;


public interface VoitureService {

    Voiture ajouterVoiture(Voiture v);
    Voiture updateVoiture(Voiture v);
    void deleteVoiture(int id);
    List<Voiture> getAllVoitures();
    List<Voiture> getVoitureBMC(String nom);
}
