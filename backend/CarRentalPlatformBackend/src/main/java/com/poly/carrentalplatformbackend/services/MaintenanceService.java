package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Maintenance;

import java.util.List;

public interface MaintenanceService {



    Maintenance getMaintenance(int id);

    List<Maintenance> getAllMaintenances();

    List<Maintenance> getMaintenancesByVoiture(int voitureId);

    Maintenance createMaintenance(Maintenance maintenance);

    Maintenance terminerMaintenance(int id);

    void deleteMaintenance(int id);
}
