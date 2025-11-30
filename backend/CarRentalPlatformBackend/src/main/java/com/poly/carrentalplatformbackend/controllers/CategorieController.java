package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Categorie;

import com.poly.carrentalplatformbackend.services.CategorieService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategorieController {

    private CategorieService categorieService;

    @PostMapping("/add")
    public void addCategorie(@RequestBody Categorie categorie) {
        categorieService.ajouterCategorie(categorie);
    }
    @GetMapping("/all")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }






    @DeleteMapping("/delete/{id}")
    public void deleteCategorie(@PathVariable int id){
        categorieService.deleteCategorie(id);
    }



    @PutMapping("/update")

    public void updateCategorie(@RequestBody Categorie categorie) {
        categorieService.updateCategorie(categorie);
    }


}
