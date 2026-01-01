package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Paiement;
import com.poly.carrentalplatformbackend.entities.PaiementStatus;
import com.poly.carrentalplatformbackend.entities.Reservation;
import com.poly.carrentalplatformbackend.entities.ReservationStatus;
import com.poly.carrentalplatformbackend.repositories.PaiementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PaiementServiceImpl implements PaiementService {

    private  PaiementRepository paiementRepository;
    private  ReservationService reservationService;


    // ================= READ =================

    @Override
    public Paiement getPaiement(int id) {
        return paiementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paiement introuvable"));
    }

    @Override
    public List<Paiement> getAllPaiements() {
        return paiementRepository.findAll();
    }

    // ================= CREATE =================
    // Le paiement est créé UNIQUEMENT après validation admin

    @Override
    public Paiement createPaiement(int reservationId) {

        Reservation reservation = reservationService.getReservation(reservationId);

        if (reservation.getStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStateException(
                    "Le paiement n'est autorisé que pour une réservation confirmée"
            );
        }

        Paiement paiement = Paiement.builder()
                .montant(reservation.getPrix())
                .status(PaiementStatus.EN_ATTENTE)
                .datePaiement(new Date())
                .reservation(reservation)
                .build();

        return paiementRepository.save(paiement);
    }

    // ================= BUSINESS =================

    @Override
    public Paiement confirmerPaiement(int paiementId) {

        Paiement paiement = getPaiement(paiementId);

        paiement.setStatus(PaiementStatus.PAYE);

        // La réservation est déjà CONFIRMED par l'admin
        return paiementRepository.save(paiement);
    }

    @Override
    public Paiement echouerPaiement(int paiementId) {

        Paiement paiement = getPaiement(paiementId);

        paiement.setStatus(PaiementStatus.ECHEC);

        // Échec paiement → annulation réservation
        Reservation reservation = paiement.getReservation();
        reservationService.updateReservationStatus(
                reservation,
                ReservationStatus.CANCELLED
        );

        return paiementRepository.save(paiement);
    }

    // ================= DELETE =================

    @Override
    public void deletePaiement(int id) {
        paiementRepository.deleteById(id);
    }


}
