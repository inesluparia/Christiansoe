package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;


@Entity
public class Species {

    @Id
    String latinName;

    String name;

    String description;

    boolean isAnimal;

    boolean discoverableWinter, discoverableSummer, discoverableSpring, discoverableAutum;

    @JsonBackReference
    @OneToMany(mappedBy = "species")
    List<Media> media;

    @ManyToMany(mappedBy = "species")
    List<PointOfInterest> pointsOfInterest;
}
