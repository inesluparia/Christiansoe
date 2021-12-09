package com.example.demo.repositories;

import com.example.demo.entities.Media;
import org.hibernate.dialect.MckoiDialect;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    @Query("SELECT m FROM Media m WHERE m.isImage = true")
    List<Media> findAllWhereMediaIsImage();

    @Query("SELECT m FROM Media m WHERE m.isImage = false")
    List<Media> findAllWhereMediaIsSound();
}
