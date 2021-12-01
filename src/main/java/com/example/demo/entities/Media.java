package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Media {

    @Id
    long id;
    String title, audioUrl, imageUrl;

    @ManyToOne
    @JoinColumn(name="species")
    Species species;
}
