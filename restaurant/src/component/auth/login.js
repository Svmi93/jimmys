import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './login.css';

function LoginForm() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(formData); 

            console.log("Réponse complète du backend :", userData); // 🔍 Vérifie toute la réponse

            if (userData && userData.role) {
                console.log("Rôle détecté :", userData.role); // 🔍 Vérifie le rôle avant stockage
                localStorage.setItem("userRole", userData.role);
            } else {
                console.log("⚠️ Aucun rôle détecté, stockage annulé !");
            }
    
            navigate('/Home'); 
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                {error && <div className="error-msg">{error}</div>}

                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        name="mot_de_passe" 
                        value={formData.mot_de_passe} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit" disabled={loading} className="btn">
                    {loading ? 'Chargement...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;