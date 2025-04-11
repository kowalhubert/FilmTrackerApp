// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilmList from './controller/FilmList.js';
import AddFilmForm from "./controller/AddFilmForm.js";
import EditFilmForm from "./controller/EditFilmForm";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<FilmList />} />
                    <Route path="/add" element={<AddFilmForm />} />
                    <Route path="/edit/:id" element={<EditFilmForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

