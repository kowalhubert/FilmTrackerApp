import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FilmList.css';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchFilms = async (search = '', sortBy = 'title', sortOrder = 'asc') => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/films', {
                params: {
                    search: search,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                },

            });
            if (response.data.releaseDate) {
                response.data.releaseDate = new Date(response.data.releaseDate).toISOString().split('T')[0];
            }
            setFilms(response.data.content);
        } catch (error) {
            console.error('Błąd podczas pobierania filmów', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchFilms(searchTerm, sortBy, sortOrder);
    }, [searchTerm, sortBy, sortOrder]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchFilms(value, sortBy, sortOrder);
    };

    const handleSortByChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        fetchFilms(searchTerm, value, sortOrder);
    };

    const handleSortOrderChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        fetchFilms(searchTerm, sortBy, value);
    };

    return (
        <div className="container">
            <h1 className="header">LISTA OBEJRZANYCH FILMÓW</h1>

            <div className="filters-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Szukaj po tytule..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <select className="select" value={sortBy} onChange={handleSortByChange}>
                    <option value="title">Tytuł</option>
                    <option value="director">Reżyser</option>
                    <option value="releaseDate">Data premiery</option>
                    <option value="rating">Ocena</option>
                    <option value="durationMinutes">Czas trwania</option>
                </select>

                <select className="select" value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Rosnąco</option>
                    <option value="desc">Malejąco</option>
                </select>
            </div>

            <Link className="add-link" to="/add">Dodaj nowy film</Link>

            {loading ? (
                <div className="loading">Ładowanie...</div>
            ) : (
                <ul className="list">
                    {films.map((film) => (
                        <li className="list-item" key={film.id}>
                            <h3 className="title">{film.title}</h3>
                            <p>Reżyser: {film.director}</p>
                            <p>Czas trwania: {film.durationMinutes} min</p>
                            <p>Data premiery: {film.releaseDate}</p>
                            <p>Ocena: {film.rating}</p>
                            <Link className="link" to={`/edit/${film.id}`}>Edytuj</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilmList;
