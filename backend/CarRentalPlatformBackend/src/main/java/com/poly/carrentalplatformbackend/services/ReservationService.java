package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Reservation;
import com.poly.carrentalplatformbackend.entities.ReservationStatus;
import com.poly.carrentalplatformbackend.entities.Voiture;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ReservationService {



     Reservation getReservation(int id);
     List<Reservation> getReservations();

     Reservation createReservation(Reservation reservation, String username);

     double calculatePrice(Voiture voiture, LocalDate start, LocalDate end);

     Reservation cancelReservation(Reservation reservation);

     Reservation updateReservationStatus(Reservation reservation , ReservationStatus status);


    void deleteReservation(int id);

    List<Reservation> getAllReservationsAdmin();












}
