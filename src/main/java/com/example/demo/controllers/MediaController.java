package com.example.demo.controllers;

import com.example.demo.entities.Media;
import com.example.demo.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaRepository mediaRepository;

    //only useful for testing purposes
    @GetMapping("/media")
    public List<Media> getAllMedia(){
        return mediaRepository.findAll();
    }

    @GetMapping ("/media/{species}")
    public List<Media> getMediaBySpecies(@PathVariable String species){
        return mediaRepository.findBySpecies(species);
    }

    @GetMapping("/sounds")
    public List<Media> getSounds(){
        return mediaRepository.findByIsImage(false);
    }

}
