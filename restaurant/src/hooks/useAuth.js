import {useState} from 'react';
import {authAPI} from '../api/config'; 

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (userData) => {
        console.log("Appel de register avec :", userData, "ok");  // Vérifier si register est bien appelé
        setLoading(true);
        try {
            const response = await authAPI.register(userData); 
            console.log("Réponse de l'API :", response); // Vérifier si la réponse est bien reçue
            setError(null);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
            throw err;
        } finally {
            setLoading(false);
        }
    };
        
    const login = async (credentials) => {
        setLoading(true);

        try {
            console.log("login appelé !");
            const response = await authAPI.login(credentials);
            setError(null);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la connexion');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
       authAPI.logout();
    };

    return {loading, error, register, login, logout};
};