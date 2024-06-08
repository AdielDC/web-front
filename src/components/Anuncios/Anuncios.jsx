// src/components/Anuncios.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Anuncios.css';

const Anuncios = () => {
    const [anuncios, setAnuncios] = useState([]);
    const [crearAnuncio, setCrearAnuncio] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnuncios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/news');
                setAnuncios(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchAnuncios();
    }, []);

    const handleCrearAnuncio = () => {
        setCrearAnuncio(true);
    };
    
    const handleCrearAnuncioCancelado = () => {
        setCrearAnuncio(false);
    };
    
    const handleCrearAnuncioSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append('titulo', event.target.titulo.value);
        formData.append('descripcion', event.target.descripcion.value);
        formData.append('imagen', event.target.imagen.files[0]);
        formData.append('fecha_publicacion', event.target.fecha_publicacion.value);
      
        try {
            const response = await axios.post('http://localhost:8000/api/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAnuncios([...anuncios, response.data]);
            setCrearAnuncio(false);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

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
                            <Link to="/trajes">Traje Típico</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="anuncios-container">
                <div className="anuncios-header">
                    <h1>Anuncios</h1>
                    <button onClick={handleCrearAnuncio}>Crear anuncio</button>
                </div>
                <div className="anuncios-list">
                    {anuncios.map((anuncio) => (
                        <div key={anuncio.id} className="anuncio-item">
                            <h2>{anuncio.titulo}</h2>
                            <p>{anuncio.descripcion}</p>
                            <img src={anuncio.imagen} alt={anuncio.titulo} />
                            <p>Fecha de publicación: {anuncio.fecha_publicacion}</p>
                        </div>
                    ))}
                </div>
                {crearAnuncio && (
                    <div className="anuncio-form">
                        <h2>Crear anuncio</h2>
                        <form onSubmit={handleCrearAnuncioSubmit}>
                            <label htmlFor="titulo">Título:</label>
                            <input type="text" id="titulo" name="titulo" />
                            <br />
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea id="descripcion" name="descripcion"></textarea>
                            <br />
                            <label htmlFor="imagen">Imagen:</label>
                            <input type="file" id="imagen" name="imagen" />
                            <br />
                            <label htmlFor="fecha_publicacion">Fecha de publicación:</label>
                            <input type="date" id="fecha_publicacion" name="fecha_publicacion" />
                            <br />
                            <button onClick={handleCrearAnuncioCancelado}>Cancelar</button>
                            <button type="submit">Crear anuncio</button>
                        </form>
                    </div>
                )}
                {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    );
};

export default Anuncios;

