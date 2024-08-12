import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = (`${apiUrl}/login`)

export const login = async(username, password) => {
    try {
        const res = await axios.post(`${API_URL}/login/`,{
            username: username,
            password: password,
        })

        localStorage.setItem('token', res.data.token);
        
        return res.data;
    } catch (err) {
        throw err.res ? err.res.data : new Error('Fallo de login');
    }
}
