package com.poly.carrentalplatformbackend.controllers;


import com.poly.carrentalplatformbackend.entities.Categorie;

import com.poly.carrentalplatformbackend.services.CategorieService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategorieController {

    private final CategorieService categorieService;

    // ✅ CREATE
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Categorie> addCategorie(@Valid @RequestBody Categorie categorie) {
        Categorie created = categorieService.ajouterCategorie(categorie);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ✅ READ ALL
    @GetMapping("/all")
    public ResponseEntity<List<Categorie>> getAllCategories() {
        return ResponseEntity.ok(categorieService.getAllCategories());
    }

    // ✅ READ ONE (optionnel mais utile)
    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorie(@PathVariable int id) {
        return ResponseEntity.ok(categorieService.getCategorie(id));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Categorie> updateCategorie(
            @PathVariable int id,
            @Valid @RequestBody Categorie categorie
    ) {
        // s'assurer que l'id du path est utilisé
        // (si ton entity a getId() / setId(), adapte le nom)
        categorie.setIdCat(id);

        Categorie updated = categorieService.updateCategorie(categorie);
        return ResponseEntity.ok(updated);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategorie(@PathVariable int id) {
        categorieService.deleteCategorie(id);
        return ResponseEntity.noContent().build(); // 204
    }

}
