package com.example.demo.controllers;

import com.example.demo.entities.Media;
import com.example.demo.entities.Species;
import com.example.demo.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping ("/media")
    public List<Media> getMediaBySpecies(@PathParam("speciesId") Optional<Long> speciesId){
        if(speciesId.isPresent())
            return mediaRepository.findBySpeciesId(speciesId.get());
        else
            return mediaRepository.findAll();
    }

    @GetMapping("/sounds")
    public List<Media> getSounds(){
        return mediaRepository.findByIsImage(false);
    }
}
