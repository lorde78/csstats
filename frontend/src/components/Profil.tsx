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
	onlineStatus: boolean;
	derniereConnexion: string;
	tempsJeu24h: number;
	tempsJeuSemaine: number;
}

const Profil: React.FC<ProfilProps> = ({
	pseudo,
	jeux,
	photoProfil,
	csgoStats,
	nationalite,
	onlineStatus,
	derniereConnexion,
	tempsJeu24h,
	tempsJeuSemaine,
}) => {
	const csgoGame = jeux.find((jeu) => jeu.appid === 730);

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
					<div className={`status ${onlineStatus ? "online" : "offline"}`}>
						<span className="status-circle"></span>
						{onlineStatus ? "Online" : `Offline depuis ${derniereConnexion}`}
					</div>
					<div className="game-stats">
						<p>Nombre de jeux : {jeux.length}</p>
						<p>
							Temps joué :{" "}
							{tempsJeu24h > 0
								? `${tempsJeu24h} heures au cours des dernières 24 heures`
								: `${tempsJeuSemaine} heures au cours de la dernière semaine`}
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
