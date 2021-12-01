package com.example.demo.repositories;
import com.example.demo.entities.Species;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepository extends JpaRepository<Species, String> {

    Page<Species> findSpeciesByIsAnimalIsTrue(Pageable pageable);
    Page<Species> findSpeciesByIsAnimalIsFalse(Pageable pageable);
}
