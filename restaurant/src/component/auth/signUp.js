import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './signUp.css';

function RegisterForm() {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        mot_de_passe: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('nom', formData.nom);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mot_de_passe', formData.mot_de_passe);
            if (profileImage) {
                formDataToSend.append('image', profileImage);
            }
            
        await register(formDataToSend);
            navigate('/Home');
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);   
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Inscription</h2>
                
                {error && <div className="error-msg">{error}</div>}

                <div className="input-group">
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <div className="input-group">
                    <label>Image de profil</label>
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    
                    {previewImage && (
                        <div className="preview-container">
                            <p>Aperçu :</p>
                            <img 
                                src={previewImage}
                                alt="Aperçu"
                                className="preview-img"
                            />
                        </div>
                    )}
                </div>

                <button type="submit" disabled={loading} className="btn">
                    {loading ? 'Chargement...' : "S'inscrire"}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;