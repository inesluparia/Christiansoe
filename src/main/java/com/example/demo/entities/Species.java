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
//  @Column(columnDefinition="bit(1) default 1")
    @Column(columnDefinition = "boolean default false")
    boolean discoverableWinter, discoverableSummer, discoverableSpring, discoverableAutum;
    @OneToMany(mappedBy = "species")
    @JsonBackReference
    List<Media> media;
    //@ManyToMany(mappedBy = "species")
    //List<PointOfInterest> pointsOfInterest;

    @ManyToMany(mappedBy = "species")
    List<PointOfInterest> pointsOfInterest;
}
