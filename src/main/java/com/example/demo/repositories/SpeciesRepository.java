package com.example.demo.repositories;
import com.example.demo.entities.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpeciesRepository extends JpaRepository<Species, String> {

    List<Species> findSpeciesByIsAnimal(boolean isAnimal);

    Species findById(long id);

    //Instead of filtering by query - because we know there are not so many species on the island
    // it's better to first get all animals and THEN filter them in the frontend with js
    //or in a service layer if we end up having one...
    List<Species> findSpeciesByDiscoverableWinterIsTrueAndIsAnimalIsTrue();


}
