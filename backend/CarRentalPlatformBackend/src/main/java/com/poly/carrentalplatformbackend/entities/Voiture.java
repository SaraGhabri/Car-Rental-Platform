package com.poly.carrentalplatformbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Voiture {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVoiture;
    private String marque;
    private String modele;
    private String matricule;
    private Double prixParJour;
    @Enumerated(EnumType.STRING)
    private VoitureStatus statut;

    @ManyToOne
    @JoinColumn(name = "categorie_id") // clé étrangère
    private Categorie categorie;


    @JsonIgnore
    @OneToMany(mappedBy = "voiture", cascade = CascadeType.ALL)
    private List<Reservation> reservations;


    @JsonIgnore
    @OneToMany(mappedBy = "voiture", cascade = CascadeType.ALL)
    private List<Maintenance> maintenances;






}
