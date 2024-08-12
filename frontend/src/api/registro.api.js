import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API_URL = (`${apiUrl}/register`)

export const registro = async(email, username, password)=>{
    try {
        const res = await axios.post (`${API_URL}/resgister/`,{
            email: email,
            username: username,
            password: password,
        })

        localStorage.setItem('token', res.data.token);

        return res.data
    } catch (error) {
        throw err.res ? err.res.data : new Error('Fallo del registro');
    }
}