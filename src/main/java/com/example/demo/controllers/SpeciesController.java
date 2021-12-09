package com.example.demo.controllers;
import com.example.demo.entities.Media;
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

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class SpeciesController {

    @Autowired
    private SpeciesRepository speciesRepository;

    @Autowired
    private SpeciesService speciesService;


    @GetMapping ("/animals")
    public List<Species> getAnimals(@PathParam("season") Optional<String> season){
        if(season.isPresent())
            return speciesService.getAnimalsBySeason(season.get());
        else
            return speciesRepository.findSpeciesByIsAnimal(true);
    }

    @GetMapping ("/plants")
    public List<Species> getPlants(@PathParam("season") Optional<String> season) {
        if (season.isPresent())
            return speciesService.getPlantsBySeason(season.get());
        else
            return speciesRepository.findSpeciesByIsAnimal(false);
    }

    //ALL SPECIES
    @GetMapping("/species")//http://localhost:8080/animals?page=0&size=4
    public ResponseEntity<Map<String, Object>> getAnimalsPage(
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

    @GetMapping("/species/{id}")
    public Species getSpeciesById(@PathVariable long id) throws Exception {
        return speciesRepository.findById(id);
               // .orElseThrow(() -> new Exception("Species not found by id:"+ id + "."));
    }


    //This 2 should not be used yet as any species can be searched by the "/species" path
    //would it be nice to have them???? Right now they are returning any species no matter if
    //they are animal or plant...
    @GetMapping("/animals/{id}")
    public Species getAnimalById(@PathVariable long id){
        return speciesRepository.findById(id);
    }
    @GetMapping(value= "/plants/{id}")
    public Species getPlantById(@PathVariable long id){
        return speciesRepository.findById(id);
    }

}
