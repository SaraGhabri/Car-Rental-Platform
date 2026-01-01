package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Voiture;
import com.poly.carrentalplatformbackend.entities.VoitureStatus;
import lombok.AllArgsConstructor;
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
    public List<Voiture> getAllVoitures() {
        return voitureService.getAllVoitures();
    }




    @GetMapping("/search")
    public List<Voiture> getVoitureBySearch(@RequestParam String search){
        return voitureService.getVoitureBMC(search);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteVoiture(@PathVariable int id){
        voitureService.deleteVoiture(id);
    }



    @PutMapping("/update")

    public void updateVoiture(@RequestBody Voiture voiture){
        voitureService.updateVoiture(voiture);
    }
    @PostMapping("/add")
    public void addVoiture(@RequestBody Voiture voiture){
        voitureService.ajouterVoiture(voiture);
    }

    // Endpoint pour le client : voitures disponibles
    @GetMapping("/available")
    public List<Voiture> getAvailableVoitures() {
        return voitureService.findAvailableVoitures();
    }

    // Endpoint pour l’admin : mettre à jour le statut d’une voiture
    @PutMapping("/{id}/statut")
    public void updateStatut(
            @PathVariable int id,
            @RequestParam VoitureStatus statut
    ) {
        voitureService.updateStatut(id, statut);
    }



}
