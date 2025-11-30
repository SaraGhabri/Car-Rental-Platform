package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Voiture;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.poly.carrentalplatformbackend.repositories.VoitureRepository;

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
}
