package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Categorie;
import com.poly.carrentalplatformbackend.repositories.CategorieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorieServiceImpl implements CategorieService {

    private final CategorieRepository categorieRepository;

    @Override
    public Categorie ajouterCategorie(Categorie c) {
        if (c == null) {
            throw new IllegalArgumentException("La catégorie ne peut pas être nulle");
        }
        return categorieRepository.save(c);
    }

    @Override
    public Categorie updateCategorie(Categorie c) {
        if (c == null) {
            throw new IllegalArgumentException("ID de la catégorie requis pour la mise à jour");
        }

        Categorie existing = categorieRepository.findById(c.getIdCat())
                .orElseThrow(() ->
                        new RuntimeException("Catégorie introuvable avec l'id : " + c.getIdCat())
                );

        // Mise à jour des champs
        existing.setNom(c.getNom());
        existing.setDescription(c.getDescription());

        return categorieRepository.save(existing);
    }

    @Override
    public void deleteCategorie(int id) {
        if (!categorieRepository.existsById(id)) {
            throw new RuntimeException("Impossible de supprimer : catégorie introuvable (id=" + id + ")");
        }
        categorieRepository.deleteById(id);
    }

    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie getCategorie(int id) {
        return categorieRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Catégorie introuvable avec l'id : " + id)
                );
    }
}