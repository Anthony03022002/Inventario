import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { registro } from "../api/registro.api";
export function Registro() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleRegistro = async (e) =>{
        e.preventDefault();
        setError(null);
        try {
            await registro(email, username, password);
            navigate('/archivos');
        } catch (err) {
            setError(err.error || 'Llenar todos los campos');
            
        }
    }

  return (
    <form onSubmit={handleRegistro}>
        <div>
            <label htmlFor="">Email</label>
            <input type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
        </div>
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
        <button type="submit">Registrarse</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
