package entities;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;


@Entity
public class Species {

    @Id
    String latinName;
    String name;
    String description;
    boolean isAnimal;
    boolean discoverableWinter, discoverableSummer, discoverableSpring, discoverableAutum;
    @OneToMany
    ArrayList<Media> media;


}
