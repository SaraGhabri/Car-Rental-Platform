package com.poly.carrentalplatformbackend.services;


import com.poly.carrentalplatformbackend.entities.Categorie;
import com.poly.carrentalplatformbackend.repositories.CategorieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    @Override
    public Categorie ajouterCategorie(Categorie c) {
        return categorieRepository.save(c);
    }

    @Override
    public Categorie updateCategorie(Categorie c) {

        return categorieRepository.save(c);
    }

    @Override
    public void deleteCategorie(int id) {
        categorieRepository.deleteById(id);
    }



    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
}
