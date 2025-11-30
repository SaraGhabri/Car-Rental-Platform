package com.poly.carrentalplatformbackend.repositories;

import com.poly.carrentalplatformbackend.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Integer> {




}
