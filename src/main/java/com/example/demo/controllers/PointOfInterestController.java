package com.example.demo.controllers;

import com.example.demo.entities.PointOfInterest;
import com.example.demo.repositories.PointOfInterestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.websocket.server.PathParam;
import java.util.List;

@Controller
public class PointOfInterestController {

    private final PointOfInterestRepository pointOfInterestRepository;

    public PointOfInterestController(PointOfInterestRepository pointOfInterestRepository) {
        this.pointOfInterestRepository = pointOfInterestRepository;
    }

    @GetMapping("/points-of-interest")
    public ResponseEntity<List<PointOfInterest>> findAll() {
        return ResponseEntity.ok().body(pointOfInterestRepository.findAll());
    }

    @GetMapping("/points-of-interest")
    public ResponseEntity<List<PointOfInterest>> findAll(
            @PathParam("page") int page,
            @PathParam("perPage") int perPage) {

        Page<PointOfInterest> pointsOfInterestPage =
                pointOfInterestRepository.findAll(PageRequest.of(page - 1, perPage));

        return ResponseEntity.ok().body(pointsOfInterestPage.getContent());
    }

    @GetMapping("/points-of-interest/{id}")
    public ResponseEntity<PointOfInterest> findById(@PathVariable long id) {

        PointOfInterest pointOfInterest = pointOfInterestRepository.findById(id);

        if (pointOfInterest == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(pointOfInterestRepository.findById(id));
    }
}
