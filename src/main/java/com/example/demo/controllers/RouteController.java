package com.example.demo.controllers;

import com.example.demo.entities.Route;
import com.example.demo.repositories.RoutesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RouteController {

    @Autowired
    private RoutesRepository routesRepository;

    @GetMapping("/routes")
    public List<Route> findAll() {
        return routesRepository.findAll();
    }

    @GetMapping("/routes/{id}")
    public Route findRouteById(@PathVariable long id) {
        return routesRepository.findById(id);
    }

}
