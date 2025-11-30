package com.poly.carrentalplatformbackend.services;

import com.poly.carrentalplatformbackend.entities.Categorie;
import com.poly.carrentalplatformbackend.entities.Voiture;

import java.util.List;

public interface CategorieService {

    Categorie ajouterCategorie(Categorie v);
    Categorie updateCategorie(Categorie c);
    void deleteCategorie(int id);
    List<Categorie> getAllCategories();
}
