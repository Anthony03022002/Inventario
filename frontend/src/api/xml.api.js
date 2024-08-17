import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const xmlApi = axios.create({
    baseURL: `${apiUrl}/cargar-xml/`,
});

xmlApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const crearXml = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await xmlApi.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error uploading XML:', error);
        throw error; 
    }
};