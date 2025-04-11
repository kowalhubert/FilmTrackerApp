package org.example.controller;

import org.example.model.Film;
import org.example.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/films")
@RequiredArgsConstructor

public class FilmController {

    private final FilmService service;

    @GetMapping
    public Page<Film> getAll(@RequestParam Optional<String> search,
                             @RequestParam(defaultValue = "0") int page,
                             @RequestParam(defaultValue = "10") int size,
                             @RequestParam(defaultValue = "title") String sortBy,
                             @RequestParam(defaultValue = "asc") String sortOrder) {

        return service.getAll(search.orElse(""), page, size, sortBy, sortOrder);
    }

    @GetMapping("/{id}")
    public Optional<Film> getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping
    public Film add(@RequestBody Film film) {
        return service.add(film);
    }

    @PutMapping("/{id}")
    public Optional<Film> update(@PathVariable String id, @RequestBody Film film) {
        return service.update(id, film);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

}
