import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './FilmForm.css';

const EditFilmForm = () => {
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/films/${id}`);
                setFilm(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania filmu', error);
            }
        };
        fetchFilm();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'releaseDate' && type === 'date') {
            setFilm((prevFilm) => ({
                ...prevFilm,
                [name]: value,
            }));
        } else {
            setFilm((prevFilm) => ({
                ...prevFilm,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedReleaseDate = film.releaseDate.split('-').reverse().join('-');

        const updatedFilm = { ...film, releaseDate: formattedReleaseDate };

        try {
            await axios.put(`http://localhost:8080/films/${id}`, updatedFilm);
            navigate('/');
        } catch (error) {
            console.error('Błąd podczas zapisywania zmian', error);
        }
    };

    if (!film) return <div>Ładowanie...</div>;

    return (
        <div className="form-container">
            <h2>Edytuj Film</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tytuł:
                    <input
                        type="text"
                        name="title"
                        value={film.title || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Reżyser:
                    <input
                        type="text"
                        name="director"
                        value={film.director || ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Czas trwania (minuty):
                    <input
                        type="number"
                        name="durationMinutes"
                        value={film.durationMinutes || 0}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Data wydania:
                    {/* Konwertowanie daty na 'yyyy-MM-dd' przed ustawieniem jej w polu date */}
                    <input
                        type="date"
                        name="releaseDate"
                        value={film.releaseDate ? film.releaseDate.split('-').reverse().join('-') : ''}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Ocena:
                    <input
                        type="number"
                        name="rating"
                        value={film.rating || 0}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="10"
                        required
                    />
                </label>
                <button type="submit">Zapisz zmiany</button>
                <button
                    type="button"
                    onClick={async () => {
                        if (window.confirm('Czy na pewno chcesz usunąć ten film?')) {
                            try {
                                await axios.delete(`http://localhost:8080/films/${id}`);
                                navigate('/');
                            } catch (error) {
                                console.error('Błąd podczas usuwania filmu', error);
                            }
                        }
                    }}
                >
                    Usuń film
                </button>
            </form>
        </div>
    );
};

export default EditFilmForm;
