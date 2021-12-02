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

    @GetMapping("/animal")
    public List<Species> getAllSpecies(){
        return speciesRepository.findAll();
    }

}
