package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Maintenance;
import com.poly.carrentalplatformbackend.entities.MaintenanceStatus;
import com.poly.carrentalplatformbackend.entities.Voiture;
import com.poly.carrentalplatformbackend.entities.VoitureStatus;
import com.poly.carrentalplatformbackend.repositories.MaintenanceRepository;
import com.poly.carrentalplatformbackend.repositories.VoitureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MaintenanceServiceImpl implements MaintenanceService {

    private MaintenanceRepository maintenanceRepository;
    private VoitureRepository voitureRepository;

    @Override
    public Maintenance getMaintenance(int id) {
        return maintenanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maintenance introuvable"));
    }

    @Override
    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    @Override
    public List<Maintenance> getMaintenancesByVoiture(int voitureId) {
        return maintenanceRepository.findByVoitureIdVoiture(voitureId);
    }

    @Override
    public Maintenance createMaintenance(Maintenance maintenance) {
        Voiture voiture = voitureRepository.findById(
                maintenance.getVoiture().getIdVoiture()
        ).orElseThrow(() -> new RuntimeException("Voiture introuvable"));

        //règle métier
        if (voiture.getStatut() == VoitureStatus.RESERVEE) {
            throw new IllegalStateException(
                    "Impossible de mettre une voiture réservée en maintenance"
            );
        }

        // état maintenance
        maintenance.setStatut(MaintenanceStatus.EN_COURS);

        // voiture indisponible
        voiture.setStatut(VoitureStatus.INDISPONIBLE);
        voitureRepository.save(voiture);

        return maintenanceRepository.save(maintenance);
    }

    @Override
    public Maintenance terminerMaintenance(int id) {
        Maintenance maintenance = getMaintenance(id);

        maintenance.setStatut(MaintenanceStatus.TERMINEE);

        Voiture voiture = maintenance.getVoiture();
        voiture.setStatut(VoitureStatus.DISPONIBLE);
        voitureRepository.save(voiture);

        return maintenanceRepository.save(maintenance);
    }

    @Override
    public void deleteMaintenance(int id) {
        maintenanceRepository.deleteById(id);

    }
}
