import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const clientesApi = axios.create({
    baseURL: (`${apiUrl}/clientes/clientes`)
});


const setAuthHeader = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
        clientesApi.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        
        delete clientesApi.defaults.headers.common['Authorization'];
    }
};

clientesApi.interceptors.request.use((config) => {
    setAuthHeader(); 
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const obtenerClientes = () => clientesApi.get('/');
