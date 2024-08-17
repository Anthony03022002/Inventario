import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const comprasApi = axios.create({
    baseURL: `${apiUrl}/compras/compras`,
});


comprasApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const obtenerVentas = () => comprasApi.get('/');

export const crearVenta = (ventas) => comprasApi.post('/', ventas);