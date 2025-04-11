package org.example.repository;

import org.example.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FilmRepository extends MongoRepository<Film, String> {
    Page<Film> findByTitleContainingIgnoreCase(String title, Pageable pageable);

}
