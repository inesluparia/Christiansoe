package com.example.demo.entities;

import javax.persistence.*;

@Entity
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    boolean isImage;
    String url;

    @ManyToOne
    @JoinColumn(name="species")
    Species species;
}
