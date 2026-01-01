package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Maintenance;
import com.poly.carrentalplatformbackend.services.MaintenanceService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenances")
@AllArgsConstructor
public class MaintenanceController {

    private MaintenanceService maintenanceService;


    // ================= GET =================

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Maintenance getMaintenance(@PathVariable int id) {
        return maintenanceService.getMaintenance(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Maintenance> getAllMaintenances() {
        return maintenanceService.getAllMaintenances();
    }

    @GetMapping("/voiture/{voitureId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Maintenance> getByVoiture(@PathVariable int voitureId) {
        return maintenanceService.getMaintenancesByVoiture(voitureId);
    }

    // ================= POST =================

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Maintenance createMaintenance(@RequestBody Maintenance maintenance) {
        return maintenanceService.createMaintenance(maintenance);
    }

    // ================= PUT =================

    @PutMapping("/{id}/terminer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Maintenance terminerMaintenance(@PathVariable int id) {
        return maintenanceService.terminerMaintenance(id);
    }

    // ================= DELETE =================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteMaintenance(@PathVariable int id) {
        maintenanceService.deleteMaintenance(id);
    }
}
