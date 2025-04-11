package org.example.service;

import org.example.model.Film;
import org.example.repository.FilmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FilmService {

    private final FilmRepository repository;


    public Page<Film> getAll(String search, int page, int size, String sortBy, String sortOrder) {
        Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        if (search != null && !search.isBlank()) {
            return repository.findByTitleContainingIgnoreCase(search, pageable);
        }

        return repository.findAll(pageable);
    }


    public Optional<Film> getById(String id) {
        return repository.findById(id);
    }


    public Film add(Film film) {
        return repository.save(film);
    }

    public Optional<Film> update(String id, Film film) {
        return repository.findById(id).map(existing -> {
            film.setId(id);
            return repository.save(film);
        });
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

}
