import { useState, useEffect } from 'react';
import axios from 'axios';
import { platsAPI } from '../api/config';

function usePlat() {
    const [plats, setPlats] = useState([]); // Liste des plats
    const [formData, setFormData] = useState({
        nom: '',
        prix: '',
        description: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Charger les plats au chargement du composant
    useEffect(() => {
        platsAPI.getAllPlats()
            .then(response => {
                console.log("Plats reçus depuis API :", response.data); // ✅ DEBUG
                setPlats(response.data);
            })
            .catch(error => console.error("Erreur chargement des plats :", error));
    }, []);

    
    // Gérer la saisie des champs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envoyer un nouveau plat à la base de données
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8889/plats', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

           
            setPlats((prevPlats) => [...prevPlats, response.data]);

            setMessage('Plat ajouté avec succès !');
            setFormData({ nom: '', prix: '', description: '' });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du plat :', error);
            setMessage('Erreur lors de l\'ajout du plat.');
        } finally {
            setLoading(false);
        }
    };

    return {
        plats,
        formData,
        handleChange,
        handleSubmit,
        message,
        loading
    };
}


export default usePlat;

