import React from "react";

interface ProfilProps {
	pseudo: string;
	jeux: { nom: string; heures: number }[];
	photoProfil: string;
	csgoStats: { name: string; value: number }[];
}

const Profil: React.FC<ProfilProps> = ({
	pseudo,
	jeux,
	photoProfil,
	csgoStats,
}) => {
	return (
		<div className="profile">
			<img
				className="profile-item"
				src={photoProfil}
				alt={`${pseudo}'s profile`}
			/>
			<h1 className="profile-item">{pseudo}</h1>
			<h2 className="profile-item">Liste des jeux</h2>
			<ul className="profile-item">
				{jeux.map((jeu, index) => (
					<li key={index}>
						{jeu.nom} - {jeu.heures} heures
					</li>
				))}
			</ul>
		</div>
	);
};

export default Profil;
