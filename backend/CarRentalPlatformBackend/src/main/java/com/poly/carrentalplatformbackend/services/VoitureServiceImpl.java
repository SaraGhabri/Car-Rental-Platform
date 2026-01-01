package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Voiture;
import com.poly.carrentalplatformbackend.entities.VoitureStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.poly.carrentalplatformbackend.repositories.VoitureRepository;

import java.util.Date;
import java.util.List;



@Service
@AllArgsConstructor
public class VoitureServiceImpl implements VoitureService {

    private VoitureRepository voitureRepository;


    @Override
    public Voiture ajouterVoiture(Voiture v) {
        return voitureRepository.save(v);
    }

    @Override
    public Voiture updateVoiture(Voiture v) {
        return voitureRepository.save(v);
    }

    @Override
    public void deleteVoiture(int id) {
        voitureRepository.deleteById(id);

    }

    @Override
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    @Override
    public List<Voiture> getVoitureBMC(String marque) {
        return voitureRepository.findByMarqueContains(marque);
    }

    @Override
    public List<Voiture> findAvailableVoitures() {
        return voitureRepository.findAvailableVoitures();
    }

    @Override
    public void updateStatut(int idVoiture, VoitureStatus statut) {
        Voiture v = voitureRepository.findById(idVoiture)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));
        v.setStatut(statut);
        voitureRepository.save(v);
    }

}
