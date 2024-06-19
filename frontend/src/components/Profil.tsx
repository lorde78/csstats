import React from "react";

interface ProfilProps {
	pseudo: string;
	jeux: { nom: string; heures: number }[];
	photoProfil: string;
	csgoStats: { name: string; value: number }[];
	view: "ct" | "t";
}

const Profil: React.FC<ProfilProps> = ({
	pseudo,
	jeux,
	photoProfil,
	csgoStats,
	view,
}) => {
	const weaponsCT = [
		{
			name: "M4A4",
			image: "path/to/m4a4.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_m4a4")?.value || 0,
		},
		{
			name: "AWP",
			image: "path/to/awp.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_awp")?.value || 0,
		},
		{
			name: "USP-S",
			image: "path/to/usps.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_usp-s")?.value || 0,
		},
		{
			name: "FAMAS",
			image: "path/to/famas.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_famas")?.value || 0,
		},
	];

	const weaponsT = [
		{
			name: "AK-47",
			image: "path/to/ak47.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_ak47")?.value || 0,
		},
		{
			name: "AWP",
			image: "path/to/awp.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_awp")?.value || 0,
		},
		{
			name: "Glock-18",
			image: "path/to/glock18.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_glock")?.value || 0,
		},
		{
			name: "Galil AR",
			image: "path/to/galilar.png",
			kills:
				csgoStats.find((stat) => stat.name === "total_kills_galilar")?.value ||
				0,
		},
	];

	return (
		<div className={`profile ${view}`}>
			<img src={photoProfil} alt={`${pseudo}'s profile`} />
			<h1>{pseudo}</h1>
			<h2>Liste des jeux</h2>
			<ul>
				{jeux.map((jeu, index) => (
					<li key={index}>
						{jeu.nom} - {jeu.heures} heures
					</li>
				))}
			</ul>

			{view === "ct" && (
				<>
					<h2>CT Weapons</h2>
					<div className="weapon-grid ct">
						{weaponsCT.map((weapon, index) => (
							<div key={index} className="weapon">
								<img src={weapon.image} alt={weapon.name} />
								<h3>{weapon.name}</h3>
								<p>Kills: {weapon.kills}</p>
							</div>
						))}
					</div>
				</>
			)}

			{view === "t" && (
				<>
					<h2>T Weapons</h2>
					<div className="weapon-grid t">
						{weaponsT.map((weapon, index) => (
							<div key={index} className="weapon">
								<img src={weapon.image} alt={weapon.name} />
								<h3>{weapon.name}</h3>
								<p>Kills: {weapon.kills}</p>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Profil;
