package com.example.demo.repositories;

import com.example.demo.entities.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findBySpecies(String species);

    List<Media> findByIsImage(boolean isImage);

}
