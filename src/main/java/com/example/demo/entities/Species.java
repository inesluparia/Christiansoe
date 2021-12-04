package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Species {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String latinName;

    private String name;

    @Column(columnDefinition="varchar(2000)")
    private String description;

    private boolean isAnimal;

//  @Column(columnDefinition="bit(1) default 1")
    @Column(columnDefinition = "boolean default false")
    private boolean discoverableWinter, discoverableSummer, discoverableSpring, discoverableAutumn;

    @OneToMany(mappedBy = "species")
    @JsonBackReference
    private List<Media> media = new ArrayList<>(); //not sure if it makes a difference instantiating the list

    @ManyToMany(mappedBy = "species")
    private List<PointOfInterest> pointsOfInterest;

    //Constructors, getters and setters
    public Species(){}

    public String getLatinName() {
        return latinName;
    }

    public void setLatinName(String latinName) {
        this.latinName = latinName;
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

    public boolean isAnimal() {
        return isAnimal;
    }

    public void setAnimal(boolean animal) {
        isAnimal = animal;
    }

    public boolean isDiscoverableWinter() {
        return discoverableWinter;
    }

    public void setDiscoverableWinter(boolean discoverableWinter) {
        this.discoverableWinter = discoverableWinter;
    }

    public boolean isDiscoverableSummer() {
        return discoverableSummer;
    }

    public void setDiscoverableSummer(boolean discoverableSummer) {
        this.discoverableSummer = discoverableSummer;
    }

    public boolean isDiscoverableSpring() {
        return discoverableSpring;
    }

    public void setDiscoverableSpring(boolean discoverableSpring) {
        this.discoverableSpring = discoverableSpring;
    }

    public boolean isDiscoverableAutumn() {
        return discoverableAutumn;
    }

    public void setDiscoverableAutumn(boolean discoverableAutum) {
        this.discoverableAutumn = discoverableAutum;
    }

    public List<Media> getMedia() {
        return media;
    }

    public void setMedia(List<Media> media) {
        this.media = media;
    }

    public List<PointOfInterest> getPointsOfInterest() {
        return pointsOfInterest;
    }

    public void setPointsOfInterest(List<PointOfInterest> pointsOfInterest) {
        this.pointsOfInterest = pointsOfInterest;
    }
}
