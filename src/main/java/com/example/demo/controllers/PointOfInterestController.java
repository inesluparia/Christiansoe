package com.example.demo.controllers;

import com.example.demo.entities.Location;
import com.example.demo.entities.PointOfInterest;
import com.example.demo.repositories.PointOfInterestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.websocket.server.PathParam;
import java.util.Optional;
import java.util.List;

@Controller
public class PointOfInterestController {

    private final PointOfInterestRepository pointOfInterestRepository;

    public PointOfInterestController(PointOfInterestRepository pointOfInterestRepository) {
        this.pointOfInterestRepository = pointOfInterestRepository;
    }

    @GetMapping("/points-of-interest")
    public ResponseEntity<List<PointOfInterest>> findWithinDistance(
            @PathParam("range") Optional<Integer> range,
            @PathParam("latitude") Optional<Double> latitude,
            @PathParam("latitude") Optional<Double> longitude) {

        List<PointOfInterest> pointsOfInterests =
                pointOfInterestRepository.findAll();

        // Check whether points of interest should be
        // filtered by range from a location.
        if (range.isPresent() &&
            latitude.isPresent() &&
            longitude.isPresent()) {

            Location location = new Location(latitude.get(), longitude.get());

            pointsOfInterests.removeIf(poi -> {
                double distance = poi.getLocation().getDistanceTo(location);
                return distance > range.get();
            });
        }

        return ResponseEntity.ok().body(pointsOfInterests);
    }

    @GetMapping("/points-of-interest/{id}")
    public ResponseEntity<PointOfInterest> findById(@PathVariable long id) {

        PointOfInterest pointOfInterest = pointOfInterestRepository.findById(id);

        if (pointOfInterest == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(pointOfInterestRepository.findById(id));
    }
}
