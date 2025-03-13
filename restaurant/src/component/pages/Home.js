// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Home.css';
import usePlats from '../../hooks/usePlats';
import React, { useEffect } from 'react';

function Home() {
    const { user } = useAuth();
    const { plats } = usePlats();

    useEffect(() => {
        console.log("Plats mis à jour :", plats); 
    }, [plats]);


    return (
        <div className="container">
        
        <header>
            <h1>Bienvenue chez Jimmy's</h1>
        </header>
        <section className="welcome">
            <h2>Bonjour, {user ? user.name : 'Invité'}!</h2>
        <p>
            Ceci est la page d'accueil de Jimmy's, votre restaurant italien américain préféré. 
            Profitez de nos délicieuses pizzas, pâtes et autres spécialités culinaires.
        </p>
</section>

        <section id="about" className="about">
    <h2>À Propos de Jimmy's</h2>
    <p>
        Bienvenue chez <strong>Jimmy's</strong>, le restaurant qui allie la tradition italienne 
        et la gourmandise américaine. Nous vous proposons des plats généreux et savoureux, préparés 
        avec des ingrédients frais et de qualité.
    </p>
    <div className="about-info">
        <div className="about-item">
            <h3>📍 Adresse</h3>
            <p>123 Rue de la Gastronomie, Paris, France</p>
        </div>
        <div className="about-item">
            <h3>🍕 Inspiration</h3>
            <p>Un mélange entre les saveurs italiennes authentiques et les classiques américains gourmands.</p>
        </div>
        <div className="about-item">
            <h3>💰 Prix Moyens</h3>
            <p>Entre <strong>12€ et 25€</strong> par plat</p>
        </div>
    </div>

    <section className="menu">
                <h2>🍽️ Menu</h2>
                <div className="menu-grid">
                    {plats.length > 0 ? (
                        plats.map((plat) => (
                            <div key={plat.id_plat} className="menu-item">
                                <h3>{plat.nom}</h3>
                                <p>{plat.description}</p>
                                <p><strong>Prix :</strong> {plat.prix} €</p>
                            </div>
                        ))
                    ) : (
                        <p>Chargement des plats...</p>
                    )}
                </div>
            </section>
</section>

        <footer>
            <p>&copy; 2025 Jimmy's. Tous droits réservés.</p>
        </footer>
    </div>
);
}

export default Home;
