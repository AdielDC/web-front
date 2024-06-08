import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      navigate('/Principal');
    } catch (error) {
      console.error('Error al autenticar usuario:', error.response ? error.response.data : error.message);
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
              <Link to="/traje">Traje Típico</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="login-register">
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="login-container">
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
