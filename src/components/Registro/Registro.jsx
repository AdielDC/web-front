import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const Navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const newUser = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('/users', newUser);

      if (response.status === 201) {
        console.log('Usuario registrado exitosamente.');
        Navigate('/Login');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario');
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
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
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
          <div className="form-group">
            <label htmlFor="repeat-password">Repetir contraseña:</label>
            <input
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;

