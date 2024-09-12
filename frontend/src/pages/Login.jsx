import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/login.api";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e)=> {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
            navigate('/archivos');
        } catch (err) {
            setError(err.error || 'Usuario o Contraseña invalidos');
        }
    }

    return (
        <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          ¿No tienes cuenta? Por favor <Link to='/registro'>Registrarse</Link>
        </p>
      </form>
    </div>
    
    );
};


