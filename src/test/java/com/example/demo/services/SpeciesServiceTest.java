package com.example.demo.services;

import com.example.demo.entities.Species;
import com.example.demo.repositories.SpeciesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class SpeciesServiceTest {

    @Mock
    SpeciesRepository repo;

    @InjectMocks
    SpeciesService service;

    @BeforeEach
    public void init(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAnimalsBySeasonTest1() {

        Species animal1 = new Species("Seal", "LatinName", "desc", true,true, true, true, true);
        Species animal2 = new Species("Frog", "LatinName", "desc", true,false, true, true, true);
        Species animal3 = new Species("Butterfly", "LatinName", "desc", true,false, true, true, false);
        Species animal4 = new Species("Spider", "LatinName", "desc", true,false, true, true, true);

        List<Species> dummyList = new ArrayList<>();
        dummyList.add(animal1);
        dummyList.add(animal2);
        dummyList.add(animal3);
        dummyList.add(animal4);

        when(repo.findSpeciesByIsAnimal(true)).thenReturn(dummyList);

        assertTrue(service.getAnimalsBySeason("winter").contains(animal1));
        assertEquals(4, service.getAnimalsBySeason("summer").size());
        assertFalse(service.getAnimalsBySeason("summer").isEmpty());
        assertThrows(RuntimeException.class , () -> service.getAnimalsBySeason("x"));

    }
}
