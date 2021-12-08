package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "species")
public class Species {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String latinName;

    @Size(max = 2000)
    private String description;

    private boolean isAnimal;

    private boolean discoverableWinter,
            discoverableSummer,
            discoverableSpring,
            discoverableAutumn = false;

    @ManyToMany
    @JsonManagedReference
    private List<Media> media;

    @JsonBackReference
    @ManyToMany(mappedBy = "species")
    private List<PointOfInterest> pointsOfInterest;

    protected Species() { }

    public Species(String name, String latinName, String description,
                   boolean isAnimal, boolean discoverableWinter,
                   boolean discoverableSummer, boolean discoverableSpring,
                   boolean discoverableAutumn, List<Media> media,
                   List<PointOfInterest> pointsOfInterest) {

        this.name = name;
        this.latinName = latinName;
        this.description = description;
        this.isAnimal = isAnimal;
        this.discoverableWinter = discoverableWinter;
        this.discoverableSummer = discoverableSummer;
        this.discoverableSpring = discoverableSpring;
        this.discoverableAutumn = discoverableAutumn;
        this.media = media;
        this.pointsOfInterest = pointsOfInterest;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    @JsonProperty(value = "isAnimal")
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

    public void setDiscoverableAutumn(boolean discoverableAutumn) {
        this.discoverableAutumn = discoverableAutumn;
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
