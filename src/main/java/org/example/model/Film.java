package org.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "films")
public class Film {
    @Id
    private String id;

    @Indexed(unique = true)
    private String imdbId;

    private String title;
    private String director;
    private int durationMinutes;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate releaseDate;
    private double rating;
}