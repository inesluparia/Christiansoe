package com.example.demo.controllers;
import com.example.demo.repositories.SpeciesRepository;
import com.example.demo.entities.Species;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class SpeciesController {

    @Autowired
    SpeciesRepository speciesRepository;

    @GetMapping("/dyr")
    public List<Species> getAllSpecies(){
        return speciesRepository.findAll();
    }

    @GetMapping("/dyr-page")
    public ResponseEntity<Map<String,Object>> getAnimalsPage(){
    int page = 0;
    int size = 6;
        Pageable paging = PageRequest.of(page, size);
        Page<Species> pageSpecies = speciesRepository.findSpeciesByIsAnimalIsTrue(paging);

        List<Species> species = pageSpecies.getContent();

        //if (species.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Map<String, Object> response = new HashMap<>();
        response.put("species", species);
        response.put("currentPage", pageSpecies.getNumber());
        response.put("totalItems", pageSpecies.getTotalElements());
        response.put("totalPages", pageSpecies.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }


}
