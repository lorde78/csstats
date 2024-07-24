import React from "react";
import GameCard from "./GameCard";
import Flag from "react-world-flags";
import "./profil.scss"; // Importez le fichier SCSS en minuscules

interface ProfilProps {
	pseudo: string;
	jeux: { nom: string; heures: number; image: string; appid: number }[];
	photoProfil: string;
	csgoStats: { name: string; value: number }[];
	nationalite: string;
	personastate: number;
	lastlogoff: number;
	tempsJeu2Semaine: number;
}

const Profil: React.FC<ProfilProps> = ({
	pseudo,
	jeux,
	photoProfil,
	csgoStats,
	nationalite,
	personastate,
	lastlogoff,
	tempsJeu2Semaine,
}) => {
	const csgoGame = jeux.find((jeu) => jeu.appid === 730);

	const derniereConnexion = new Date(lastlogoff * 1000).toLocaleString();

	const getStatusText = (personastate: number) => {
		switch (personastate) {
			case 0:
				return `Offline (dernière connexion : ${derniereConnexion})`;
			case 1:
				return "Online";
			case 2:
				return "Busy";
			case 3:
				return "Away";
			case 4:
				return "Snooze";
			case 5:
				return "Looking to trade";
			case 6:
				return "Looking to play";
			default:
				return "Unknown";
		}
	};

	const getStatusClass = (personastate: number) => {
		switch (personastate) {
			case 0:
				return "offline";
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				return "online";
			default:
				return "";
		}
	};

	return (
		<div className="profile">
			<div className="profile-header">
				<img
					className="profile-photo"
					src={photoProfil}
					alt={`${pseudo}'s profile`}
				/>
				<div className="profile-info">
					<div className="profile-info-header">
						<Flag
							code={nationalite}
							className="nationality-flag"
							alt={`${nationalite} flag`}
							fallback={<span>🏳️</span>}
						/>
						<h1>{pseudo}</h1>
					</div>
					<div className={`status ${getStatusClass(personastate)}`}>
						<span className="status-circle"></span>
						{getStatusText(personastate)}
					</div>
					<div className="game-stats">
						<p>Nombre de jeux : {jeux.length}</p>
						<p>
							Temps joué : {tempsJeu2Semaine} heures au cours des deux dernières
							semaines
						</p>
					</div>
				</div>
			</div>
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
				<p className="profile-item">
					Désolé, vous n'avez pas de jeux compatible.
				</p>
			)}
		</div>
	);
};

export default Profil;
