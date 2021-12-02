package com.example.demo.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "points_of_interest")
public class PointOfInterest {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Embedded
    private Location location;

    @ManyToMany
    private List<Species> species;

    protected PointOfInterest() { }

    public PointOfInterest(String name, String description, Location location, List<Species> species) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.species = species;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Species> getSpecies() {
        return species;
    }

    public void setSpecies(List<Species> species) {
        this.species = species;
    }
}
