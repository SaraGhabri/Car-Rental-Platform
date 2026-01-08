package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Paiement;
import com.poly.carrentalplatformbackend.services.PaiementService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/api/paiements")
@CrossOrigin("*")
public class PaiementController {

    private final PaiementService paiementService;

    // ================= CLIENT =================

    /**
     * Créer (ou récupérer) un paiement à partir d'une réservation confirmée
     */
    @PostMapping("/reservation/{reservationId}")
    public Paiement createPaiement(@PathVariable int reservationId) {
        return paiementService.createPaiement(reservationId);
    }

    /**
     * Confirmer le paiement (simulation)
     */
    @PutMapping("/{id}/confirm")
    public Paiement confirmPaiement(@PathVariable int id) {
        return paiementService.confirmerPaiement(id);
    }

    /**
     * Échec du paiement
     */
    @PutMapping("/{id}/fail")
    public Paiement failPaiement(@PathVariable int id) {
        return paiementService.echouerPaiement(id);
    }

    // ================= ADMIN =================

    /**
     * Voir tous les paiements
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Paiement> getAllPaiements() {
        return paiementService.getAllPaiements();
    }

    /**
     * Voir un paiement par ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Paiement getPaiement(@PathVariable int id) {
        return paiementService.getPaiement(id);
    }

    /**
     * Supprimer un paiement
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePaiement(@PathVariable int id) {
        paiementService.deletePaiement(id);
    }
}