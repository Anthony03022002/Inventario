import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; 

const excelApi = axios.create({
    baseURL: `${apiUrl}/cargar-excel/`, 
});


excelApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export const crearExcel = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await excelApi.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error al subir el archivo Excel:', error);
        throw error; 
    }
};
