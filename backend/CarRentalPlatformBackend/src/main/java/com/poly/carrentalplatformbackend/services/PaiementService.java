package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Paiement;

import java.util.List;

public interface PaiementService {


    Paiement getPaiement(int id);

    List<Paiement> getAllPaiements();

    Paiement createPaiement(int reservationId);

    Paiement confirmerPaiement(int paiementId);

    Paiement echouerPaiement(int paiementId);

    void deletePaiement(int id);
}
