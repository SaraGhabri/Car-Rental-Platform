package com.poly.carrentalplatformbackend.entities;


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
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMaintenance;

    private LocalDate dateDeb;

    private LocalDate dateFin;

    private String type;
    @Enumerated(EnumType.STRING)
    private MaintenanceStatus statut;
    private double prix;

    @ManyToOne
    @JoinColumn(name = "voiture_id")
    private Voiture voiture;
}
