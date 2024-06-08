import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Lengua.css';

const Lengua = () => {
    const [lenguajes, setLenguajes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/lenguajes')
            .then(response => {
                setLenguajes(response.data);
            })
            .catch(error => {
                setError('No se pudo cargar los datos de la lengua. Por favor, inténtalo de nuevo más tarde.');
            });
    }, []);

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <Link to="/principal"><img src="src/assets/images/logo/logo.png" alt="Logo" /></Link>
                </div>
                <nav className="nav-links">
                    <ul>
                        <li>
                            <Link to="/lengua">Lengua</Link>
                        </li>
                        <li>
                            <Link to="/tradicion">Tradición</Link>
                        </li>
                        <li>
                            <Link to="/traje">Traje Típico</Link>
                        </li>
                    </ul>
                </nav>
                
            </header>
            <div className="lengua-container">
                <h1>Lengua Materna</h1>
                <ul>
                    {lenguajes.map((lenguaje) => (
                        <li key={lenguaje.id} className="lengua-item">
                            <h2>{lenguaje.nombre}</h2>
                            <p>Pronunciación: {lenguaje.pronunciacion}</p>
                            <p>Significado: {lenguaje.significado}</p>
                            <p>Content ID: {lenguaje.content_id}</p>
                        </li>
                    ))}
                </ul>
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
};

export default Lengua;


