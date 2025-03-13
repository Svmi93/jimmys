import React from 'react';
import usePlats from '../../hooks/usePlats';  
import '../../style/usePlats.css';

function AddDish() {
    const { formData, handleChange, handleSubmit, message, loading } = usePlats(); // Utilisation du Hook

    return (
        <div className="add-dish-container">
            <h2>Ajouter un Plat</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="add-dish-form">
                <div className="input-group">
                    <label>Nom du Plat</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Prix (€)</label>
                    <input type="number" name="prix" value={formData.prix} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Ajout en cours...' : 'Ajouter le Plat'}
                </button>
            </form>
        </div>
    );
}

export default AddDish;
