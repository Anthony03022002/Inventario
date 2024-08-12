import { useEffect, useState } from 'react';
import { perfilUsuario } from '../api/perfil'; 

export function Perfil() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await perfilUsuario();
                setProfile(profileData);
            } catch (err) {
                setError('Error al obtener el perfil. Asegúrate de estar autenticado.');
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1><strong>Bienvenido {profile.username}</strong></h1>
        </div>
    );
}
