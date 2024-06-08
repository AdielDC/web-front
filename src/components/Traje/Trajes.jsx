import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './Trajes.css';

const Trajes = () => {
    const [costumes, setCostumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCostumes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/costumes');
                setCostumes(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCostumes();
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
            <div className="costumes-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <ul>
                        {costumes.map(costume => (
                            <li key={costume.id} className="costume-item">
                                <h2>{costume.nombre}</h2>
                                <p>{costume.descripcion}</p>
                                <img src={costume.imagen} alt={costume.nombre} />
                            </li>
                        ))}
                    </ul>
                )}
                {error && <p>Error al cargar los trajes: {error.message}</p>}
            </div>
        </div>
    );
};

export default Trajes;
