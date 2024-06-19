import React from "react";

interface ProfilProps {
	pseudo: string;
	jeux: { nom: string; heures: number }[];
	photoProfil: string;
}

const Profil: React.FC<ProfilProps> = ({ pseudo, jeux, photoProfil }) => {
	return (
		<div>
			<img src={photoProfil} alt={`${pseudo}'s profile`} />
			<h1>{pseudo}</h1>
			<h2>Game List</h2>
			<ul>
				{jeux.map((jeu, index) => (
					<li key={index}>
						{jeu.nom} - {jeu.heures} hours
					</li>
				))}
			</ul>
		</div>
	);
};

export default Profil;