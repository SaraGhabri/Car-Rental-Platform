package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Voiture;
import com.poly.carrentalplatformbackend.entities.VoitureStatus;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.poly.carrentalplatformbackend.services.VoitureService;

import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/voitures")
@CrossOrigin("*")
public class VoitureController {

    private VoitureService voitureService;


    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }




    @GetMapping("/search")
    public List<Voiture> getVoitureBySearch(@RequestParam String search){
        return voitureService.getVoitureBMC(search);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteVoiture(@PathVariable int id){
        voitureService.deleteVoiture(id);
    }



    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateVoiture(@RequestBody Voiture voiture){
        voitureService.updateVoiture(voiture);
    }
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addVoiture(@RequestBody Voiture voiture){
        voitureService.ajouterVoiture(voiture);
    }

    // Endpoint pour le client : voitures disponibles
    @GetMapping("/available")
    public List<Voiture> getAvailableVoitures() {
        return voitureService.findAvailableVoitures();
    }

    // Endpoint pour l’admin : mettre à jour le statut d’une voiture
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/statut")
    public void updateStatut(
            @PathVariable int id,
            @RequestParam VoitureStatus statut
    ) {
        voitureService.updateStatut(id, statut);
    }



}
