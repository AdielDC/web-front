import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Tradicion.css';

const Tradicion = () => {
    const [traditions, setTraditions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTraditions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/traditions');
                setTraditions(response.data);
            } catch (error) {
                setError('Error al cargar las tradiciones. Inténtalo de nuevo más tarde.');
            }
        };

        fetchTraditions();
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
                            <Link to="/trajes">Traje Típico</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="traditions-container">
                <h1>Tradiciones</h1>
                <ul>
                    {traditions.map((tradition) => (
                        <li key={tradition.id} className="tradition-item">
                            <h2>{tradition.nombre}</h2>
                            <p>{tradition.descripcion}</p>
                            <img src={tradition.imagen} alt={tradition.nombre} />
                        </li>
                    ))}
                </ul>
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
};

export default Tradicion;
