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
            setError(err.error || 'Usuario o Contrasena invalidos');
        }
    }

    return (
        <form onSubmit={handleLogin}>
        <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username" 
            />
        </div>
        <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" 
            />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       <p>¿No tienes cuenta? Por favor <Link to='/registro'>Registrarse</Link></p>

    </form>
    
    );
};


