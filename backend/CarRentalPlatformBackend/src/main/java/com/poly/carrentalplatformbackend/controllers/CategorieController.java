package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Categorie;

import com.poly.carrentalplatformbackend.services.CategorieService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategorieController {

    private CategorieService categorieService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void addCategorie(@RequestBody Categorie categorie) {
        categorieService.ajouterCategorie(categorie);
    }
    @GetMapping("/all")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }






    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteCategorie(@PathVariable int id){
        categorieService.deleteCategorie(id);
    }



    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateCategorie(@RequestBody Categorie categorie) {
        categorieService.updateCategorie(categorie);
    }


}
