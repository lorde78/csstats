import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router-dom";
import "./App.scss"; // Utilisez le fichier SCSS en minuscules
import Profil from "./components/Profil"; // Gardez le nom du composant avec la majuscule
import Formulaire from "./components/Formulaire";
import axios from "axios";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profil/:steamId" element={<Profile />} />
			</Routes>
		</Router>
	);
};

const Home: React.FC = () => {
	const navigate = useNavigate();

	const handleFormSubmit = (data: any) => {
		const steamId = data.profile.steamid;
		navigate(`/profil/${steamId}`);
	};

	return (
		<div className="container">
			<Formulaire onSubmit={handleFormSubmit} />
		</div>
	);
};

const Profile: React.FC = () => {
	const { steamId } = useParams<{ steamId: string }>();
	const [userData, setUserData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/steam/${steamId}`
				);
				setUserData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [steamId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (
		!userData ||
		!userData.profile ||
		!userData.games ||
		!userData.stats ||
		!userData.recentlyPlayed
	) {
		return <div>Error loading profile</div>;
	}

	const profileData = userData.profile;
	const jeuxData = userData.games.map((game: any) => ({
		nom: game.name,
		heures: Math.round(game.playtime_forever / 60),
		image:
			game.appid === 730
				? `${process.env.PUBLIC_URL}/images/csbutton.png`
				: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
		appid: game.appid,
	}));
	const csgoStatsData = userData.stats;

	// Calcul du temps de jeu des deux dernières semaines
	const tempsJeu2Semaine = Math.round(
		userData.recentlyPlayed.reduce(
			(total: number, game: any) => total + game.playtime_2weeks,
			0
		) / 60
	);

	return (
		<div className="profile-container show">
			<Profil
				pseudo={profileData.personaname}
				jeux={jeuxData}
				photoProfil={profileData.avatarfull}
				csgoStats={csgoStatsData}
				nationalite={profileData.loccountrycode}
				personastate={profileData.personastate}
				lastlogoff={profileData.lastlogoff}
				tempsJeu2Semaine={tempsJeu2Semaine}
			/>
		</div>
	);
};

export default App;
