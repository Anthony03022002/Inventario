import axios from 'axios';


const token = localStorage.getItem('token');  

const apiUrl = import.meta.env.VITE_API_URL;

const clientesApi = axios.create({
    baseURL: `${apiUrl}/clientes/clientes`,
    headers: {
        Authorization: `Token ${token}`,  
    },
});

export const obtenerClientes = () => clientesApi.get('/');
