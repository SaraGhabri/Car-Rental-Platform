package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Integer> {

    List<Maintenance> findByVoitureIdVoiture(int voitureId);
}
