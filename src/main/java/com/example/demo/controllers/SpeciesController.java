package com.example.demo.controllers;
import com.example.demo.entities.Media;
import com.example.demo.repositories.MediaRepository;
import com.example.demo.repositories.SpeciesRepository;
import com.example.demo.entities.Species;
import com.example.demo.services.SpeciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class SpeciesController {

    @Autowired
    private SpeciesRepository speciesRepository;

    @Autowired
    private SpeciesService speciesService;


    @GetMapping("/animals")
    public List<Species> getAllAnimals(){
        return speciesRepository.findSpeciesByIsAnimal(true);
    }

    @GetMapping("/animals/{season}")
    public List<Species> getAnimalsBySeason(@PathVariable String season){
        return speciesService.getAnimalsBySeason(season);
    }



    @GetMapping("/plants")
    public List<Species> getAllPlants(){
        return speciesRepository.findSpeciesByIsAnimal(false);
    }

    @GetMapping("/species")//http://localhost:8080/animals?page=0&size=4
    public ResponseEntity<Map<String,Object>> getAnimalsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Species> pageSpecies = speciesRepository.findAll(paging);
        List<Species> species = pageSpecies.getContent();
        //from Jarls code
        //if (species.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        Map<String, Object> response = new HashMap<>();
        response.put("species", species);
        response.put("currentPage", pageSpecies.getNumber());
        response.put("totalItems", pageSpecies.getTotalElements());
        response.put("totalPages", pageSpecies.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
