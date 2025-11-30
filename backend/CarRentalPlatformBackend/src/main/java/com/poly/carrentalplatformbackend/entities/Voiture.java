package com.poly.carrentalplatformbackend.entities;


import jakarta.persistence.*;
import lombok.*;

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
    private String statut;




}
