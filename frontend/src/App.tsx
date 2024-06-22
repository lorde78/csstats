import React, { useState, useEffect } from "react";
import "./App.scss";
import Profil from "./components/Profil";
import Formulaire from "./components/Formulaire";

const App: React.FC = () => {
	const [userData, setUserData] = useState<any>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showProfile, setShowProfile] = useState(false);

	const handleFormSubmit = (data: any) => {
		setUserData(data);
		setIsSubmitted(true);
	};

	useEffect(() => {
		if (isSubmitted) {
			const timer = setTimeout(() => {
				setShowProfile(true);
			}, 500); // Delay to match the slide-out animation duration
			return () => clearTimeout(timer);
		}
	}, [isSubmitted]);

	return (
		<div className="container">
			<div className={`landing-page ${isSubmitted ? "slide-left" : ""}`}>
				<h1>Veux-tu te regarder dans le miroir ?</h1>
				<Formulaire onSubmit={handleFormSubmit} />
			</div>
			{showProfile && (
				<div className="profile-container show">
					<Profil
						pseudo={userData.profile.personaname}
						jeux={[]} // Remplacez par les données appropriées
						photoProfil={userData.profile.avatarfull}
						csgoStats={userData.stats}
						view="ct" // Ou une logique pour choisir entre "ct" et "t"
					/>
				</div>
			)}
		</div>
	);
};

export default App;
