import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FilmForm.css';

const AddFilmForm = () => {
    const [newFilm, setNewFilm] = useState({
        title: '',
        director: '',
        durationMinutes: 0,
        watched: false,
        releaseDate: '',
        rating: 0.0,
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewFilm((prevFilm) => ({
            ...prevFilm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/films', newFilm);
            navigate('/');
        } catch (error) {
            console.error('Błąd podczas dodawania filmu', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Dodaj Film</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tytuł:
                    <input
                        type="text"
                        name="title"
                        value={newFilm.title}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Reżyser:
                    <input
                        type="text"
                        name="director"
                        value={newFilm.director}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Czas trwania (minuty):
                    <input
                        type="number"
                        name="durationMinutes"
                        value={newFilm.durationMinutes}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Data premiery:
                    <input
                        type="date"
                        name="releaseDate"
                        value={newFilm.releaseDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Ocena:
                    <input
                        type="number"
                        name="rating"
                        value={newFilm.rating}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="10"
                        required
                    />
                </label>

                <button type="submit">Dodaj film</button>
            </form>
        </div>
    );
};

export default AddFilmForm;
