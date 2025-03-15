import { toast } from "react-hot-toast";
import { BASE_URL } from '../Utils/Config';
import axios from 'axios';
export function getLocal() {
  return localStorage.getItem('authToken');
}
export default async function login(email, password) {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/token/`, {
            email: email,
            password: password
        });
        const data = response.data;
        if (response.status === 200) {
            const token = data.access;
            const userId = data.user_id;
            const username = data.username;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            if (data.first_name && data.last_name) {
                localStorage.setItem('firstName', data.first_name);
                localStorage.setItem('lastName', data.last_name);
            }
            toast.success('Login Success');
            return data;
        } else {
            toast.error('Invalid User Credential');
            return null;
        }
    } catch (error) {
        toast.error('An error occurred during login');
        return null;
    }
}
export const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
};
export const isTokenExpired = (token) => {
    try {
        const decodedToken = decodeToken(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
};
 
 









 




