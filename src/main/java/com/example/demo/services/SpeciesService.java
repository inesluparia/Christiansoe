package com.example.demo.services;

import com.example.demo.entities.Species;
import com.example.demo.repositories.SpeciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpeciesService {

@Autowired
private SpeciesRepository speciesRepository;


    public List<Species> getAnimalsBySeason(String season){
        List<Species> allAnimals = speciesRepository.findSpeciesByIsAnimal(true);

        switch(season){
            case "winter":{
                return allAnimals.stream().filter(Species::isDiscoverableWinter).collect(Collectors.toList());
            }
            case "spring":{
                return allAnimals.stream().filter(Species::isDiscoverableSpring).collect(Collectors.toList());
            }
            case "summer":{
                return allAnimals.stream().filter(Species::isDiscoverableSummer).collect(Collectors.toList());
            }
            case "autumn":{
                return allAnimals.stream().filter(Species::isDiscoverableAutumn).collect(Collectors.toList());
            }
            default:
                return null;
        }
    }

}
