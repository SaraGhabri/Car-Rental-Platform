package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.*;
import com.poly.carrentalplatformbackend.repositories.PaiementRepository;
import com.poly.carrentalplatformbackend.repositories.ReservationRepository;
import com.poly.carrentalplatformbackend.repositories.UserRepository;
import com.poly.carrentalplatformbackend.repositories.VoitureRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;
    private VoitureRepository voitureRepository;
    private UserRepository userRepository;
    private PaiementRepository paiementRepository;

    // ================= READ =================

    @Override
    public Reservation getReservation(int id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    @Override
    public List<Reservation> getReservations() {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return reservationRepository.findByUserUsernameAndStatusNot(
                username,
                ReservationStatus.CANCELLED
        );
    }




    // ================= CREATE =================

    @Override
    public Reservation createReservation(Reservation reservation, String username) {

        if (reservation.getVoiture() == null || reservation.getVoiture().getIdVoiture() == 0)
            throw new IllegalArgumentException("voiture.idVoiture obligatoire");

        if (reservation.getStartDate() == null || reservation.getEndDate() == null)
            throw new IllegalArgumentException("startDate et endDate obligatoires");

        Voiture voiture = voitureRepository.findById(reservation.getVoiture().getIdVoiture())
                .orElseThrow(() -> new RuntimeException("Voiture not found"));

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new RuntimeException("User not found");

        reservation.setVoiture(voiture);
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.PENDING);

        double prix = calculatePrice(voiture, reservation.getStartDate(), reservation.getEndDate());
        reservation.setPrix(prix);

        return reservationRepository.save(reservation);
    }


    // ================= BUSINESS =================

    @Override
    public double calculatePrice(Voiture voiture, LocalDate start, LocalDate end) {

        long days = ChronoUnit.DAYS.between(start, end);

        if (days <= 0) {
            throw new IllegalArgumentException("Dates invalides");
        }

        return days * voiture.getPrixParJour();
    }

    // ================= UPDATE =================

    @Override
    public Reservation updateReservationStatus(Reservation reservation, ReservationStatus status) {

        reservation.setStatus(status);

        Voiture voiture = voitureRepository.findById(reservation.getVoiture().getIdVoiture())
                .orElseThrow(() -> new RuntimeException("Voiture not found"));

        if (status == ReservationStatus.CONFIRMED){
            voiture.setStatut(VoitureStatus.RESERVEE);
            Paiement paiement = Paiement.builder()
                    .montant(reservation.getPrix())
                    .status(PaiementStatus.EN_ATTENTE)
                    .datePaiement(new Date())
                    .reservation(reservation)
                    .build();

            paiementRepository.save(paiement);
        }
        if (status == ReservationStatus.CANCELLED) voiture.setStatut(VoitureStatus.DISPONIBLE);
        if (status == ReservationStatus.COMPLETED) voiture.setStatut(VoitureStatus.DISPONIBLE);

        voitureRepository.save(voiture);
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation cancelReservation(Reservation reservation) {
        return updateReservationStatus(reservation, ReservationStatus.CANCELLED);
    }

    // ================= DELETE =================

    @Override
    public void deleteReservation(int id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public List<Reservation> getAllReservationsAdmin() {
        return reservationRepository.findAll();
    }
}
