import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const clientesApi = axios.create({
    baseURL: `${apiUrl}/clientes/clientes`,
});

clientesApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const obtenerClientes = () => clientesApi.get('/');

export const createClientes = (clientes) => clientesApi.post('/', clientes);
