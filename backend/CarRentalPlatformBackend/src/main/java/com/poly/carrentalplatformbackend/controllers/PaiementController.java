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

    private PaiementService paiementService;


    /**
     * Confirmer le paiement (simulation passerelle de paiement)
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
     * Récupérer tous les paiements
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Paiement> getAllPaiements() {
        return paiementService.getAllPaiements();
    }

    /**
     * Récupérer un paiement par ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Paiement getPaiement(@PathVariable int id) {
        return paiementService.getPaiement(id);
    }

    /**
     * Supprimer un paiement
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deletePaiement(@PathVariable int id) {
        paiementService.deletePaiement(id);
    }

}
