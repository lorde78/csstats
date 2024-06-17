import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchSteamProfile, SteamProfile } from "./utils/fetchSteamProfile";
import "./App.css";
import Profil from "./components/Profil";

const App: React.FC = () => {
	const [profile, setProfile] = useState<SteamProfile | null>(null);

	const { data, isLoading, refetch } = useQuery<SteamProfile>(
		"steamProfile",
		fetchSteamProfile,
		{
			enabled: false, // Désactive la requête automatique
		}
	);

	useEffect(() => {
		// Requête pour récupérer le profil lors du montage initial du composant
		refetch().then((result) => {
			if (result.data) {
				setProfile(result.data);
			}
		});
	}, [refetch]);

	return (
		<div className="App">
			{isLoading && <p>Chargement du profil...</p>}

			{profile && (
				<Profil
					pseudo={profile.personaname}
					jeux={[]} // Remplacez par les données appropriées
					photoProfil={profile.avatarfull}
				/>
			)}
		</div>
	);
};

export default App;
