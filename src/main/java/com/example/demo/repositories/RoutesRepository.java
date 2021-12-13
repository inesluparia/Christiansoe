package com.example.demo.repositories;

import com.example.demo.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutesRepository extends JpaRepository<Route,Long> {

    List<Route> findAll();

}
