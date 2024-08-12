import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API_URL = (`${apiUrl}/profile`);

export const perfilUsuario = async () => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_URL}/profile/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        return response.data;
    } catch (err) {
        throw err.response ? err.response.data : new Error('Fallo al obtener el perfil');
    }
};