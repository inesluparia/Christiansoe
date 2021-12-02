package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
public class Media {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private boolean isImage;

    private String url;

    @ManyToOne
    @JoinColumn(name="species")
    //@JsonManagedReference
    private Species species;

    //Constructors, getters and setters
    public Media(boolean isImage, String url, Species species) {
        this.isImage = isImage;
        this.url = url;
        this.species = species;
    }

    public Media() {

    }

    public long getId() {
        return id;
    }

    public boolean isImage() {
        return isImage;
    }

    public void setImage(boolean image) {
        isImage = image;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Species getSpecies() {
        return species;
    }

    public void setSpecies(Species species) {
        this.species = species;
    }
}
