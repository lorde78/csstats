import React from "react";
import GameCard from "./GameCard";

interface ProfilProps {
    pseudo: string;
    jeux: { nom: string; heures: number; image: string; appid: number }[];
    photoProfil: string;
    csgoStats: { name: string; value: number }[];
}

const Profil: React.FC<ProfilProps> = ({
    pseudo,
    jeux,
    photoProfil,
    csgoStats,
}) => {
    const csgoGame = jeux.find(jeu => jeu.appid === 730);

    return (
        <div className="profile">
            <img
                className="profile-item"
                src={photoProfil}
                alt={`${pseudo}'s profile`}
            />
            <h1 className="profile-item">{pseudo}</h1>
            <h2 className="profile-item">Liste des jeux</h2>
            {csgoGame ? (
                <div className="game-list profile-item">
                    <GameCard 
                        nom={csgoGame.nom} 
                        image={csgoGame.image} 
                        heures={csgoGame.heures} 
                    />
                </div>
            ) : (
                <p className="profile-item">Désolé, vous n'avez pas de jeux compatible.</p>
            )}
            <h2 className="profile-item">CS:GO Stats</h2>
            <div className="profile-item stats-container">
                <ul>
                    {csgoStats.map((stat, index) => (
                        <li key={index}>
                            {stat.name}: {stat.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profil;
