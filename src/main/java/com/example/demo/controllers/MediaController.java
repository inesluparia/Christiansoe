package com.example.demo.controllers;

import com.example.demo.entities.Media;
import com.example.demo.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MediaController {

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping ("/media")
    public List<Media> findAll() {
        return mediaRepository.findAll();
    }

    @GetMapping("/sounds")
    public List<Media> findWhereMediaIsSound() {
        return mediaRepository.findAllWhereMediaIsSound();
    }
}
