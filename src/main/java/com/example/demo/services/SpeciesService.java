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

        return filterBySeason(season, allAnimals);
    }

    public List<Species> getPlantsBySeason(String season){
        List<Species> allPlants = speciesRepository.findSpeciesByIsAnimal(false);

        return filterBySeason(season, allPlants);
    }

    private List<Species> filterBySeason(String season, List<Species> species) {
        switch(season){
            case "winter":{
                return species.stream().filter(Species::isDiscoverableWinter).collect(Collectors.toList());
            }
            case "spring":{
                return species.stream().filter(Species::isDiscoverableSpring).collect(Collectors.toList());
            }
            case "summer":{
                return species.stream().filter(Species::isDiscoverableSummer).collect(Collectors.toList());
            }
            case "autumn":{
                return species.stream().filter(Species::isDiscoverableAutumn).collect(Collectors.toList());
            }
            default:
                return null;
        }
    }


}
