package com.poly.carrentalplatformbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPaiement;

    private double montant;

    @Enumerated(EnumType.STRING)
    private PaiementStatus status;

    private Date datePaiement;

    @OneToOne
    @JoinColumn(name = "reservation_id", unique = true)
    private Reservation reservation;
}
