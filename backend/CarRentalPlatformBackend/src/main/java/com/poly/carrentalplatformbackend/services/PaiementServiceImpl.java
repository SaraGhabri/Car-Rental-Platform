package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Paiement;
import com.poly.carrentalplatformbackend.entities.PaiementStatus;
import com.poly.carrentalplatformbackend.entities.Reservation;
import com.poly.carrentalplatformbackend.entities.ReservationStatus;
import com.poly.carrentalplatformbackend.repositories.PaiementRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PaiementServiceImpl implements PaiementService {

    private final PaiementRepository paiementRepository;
    private final ReservationService reservationService;

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
    // Paiement autorisé uniquement si réservation CONFIRMED

    @Override
    @Transactional
    public Paiement createPaiement(int reservationId) {

        // ✅ si déjà créé -> on le renvoie (évite doublons)
        return paiementRepository.findByReservationIdReservation(reservationId)
                .orElseGet(() -> {

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
                });
    }

    // ================= BUSINESS =================

    @Override
    @Transactional
    public Paiement confirmerPaiement(int paiementId) {
        Paiement paiement = getPaiement(paiementId);

        // ✅ si déjà payé, on renvoie directement
        if (paiement.getStatus() == PaiementStatus.PAYE) {
            return paiement;
        }

        paiement.setStatus(PaiementStatus.PAYE);
        paiement.setDatePaiement(new Date());

        return paiementRepository.save(paiement);
    }

    @Override
    @Transactional
    public Paiement echouerPaiement(int paiementId) {
        Paiement paiement = getPaiement(paiementId);

        // ✅ si déjà échec, on renvoie direct
        if (paiement.getStatus() == PaiementStatus.ECHEC) {
            return paiement;
        }

        paiement.setStatus(PaiementStatus.ECHEC);
        paiement.setDatePaiement(new Date());

        // ✅ Échec -> annule la réservation
        Reservation reservation = paiement.getReservation();
        reservationService.updateReservationStatus(reservation, ReservationStatus.CANCELLED);

        return paiementRepository.save(paiement);
    }

    // ================= DELETE =================

    @Override
    public void deletePaiement(int id) {
        if (!paiementRepository.existsById(id)) {
            throw new RuntimeException("Paiement introuvable");
        }
        paiementRepository.deleteById(id);
    }
}