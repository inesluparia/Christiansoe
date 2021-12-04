package com.example.demo.controllers;

import com.example.demo.entities.Media;
import com.example.demo.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaRepository mediaRepository;


    // TODO: 04/12/2021 figure out this method, cannot make it work!
    //@GetMapping (value="/media", params = "speciesid")
   // public List<Media> getMediaBySpecies(@RequestParam long speciesId){
   //    return mediaRepository.findBySpeciesId(speciesId);
   // }

    @GetMapping("/sounds")
    public List<Media> getSounds(){
        return mediaRepository.findByIsImage(false);
    }

    //only useful for testing purposes
    @GetMapping(value= "/media")
    public List<Media> getAllMedia(){
        return mediaRepository.findAll();
    }
}
