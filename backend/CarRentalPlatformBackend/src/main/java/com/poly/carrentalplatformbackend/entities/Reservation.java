package com.poly.carrentalplatformbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReservation;
    private LocalDate startDate;
    private LocalDate endDate;
    private double prix;
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;


    @ManyToOne
    @JoinColumn(name = "voiture_id")
    private Voiture voiture;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
