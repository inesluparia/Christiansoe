package entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Media {

    @Id
    long id;
    String title, audioURL, imageURL;
}
