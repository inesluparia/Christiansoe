package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="routes")
public class Route {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    long id;

    private String name;

    @Size(max=2000)
    private String description;

    @ManyToMany
    @JsonManagedReference
    private List<PointOfInterest> pointsOfInterest;

    public Route(String name, String description, List<PointOfInterest> pointsOfInterest) {
        this.name = name;
        this.description = description;
        this.pointsOfInterest = pointsOfInterest;
    }

    public Route() {

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<PointOfInterest> getPointsOfInterest() {
        return pointsOfInterest;
    }

    public void setPointsOfInterest(List<PointOfInterest> pointsOfInterest) {
        this.pointsOfInterest = pointsOfInterest;
    }
}
