import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const productosApi = axios.create({
    baseURL: `${apiUrl}/productos/productos`,
});

productosApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const obtenerProductos = () => productosApi.get('/');

export const crearProducto = (producto) => productosApi.post('/', producto);