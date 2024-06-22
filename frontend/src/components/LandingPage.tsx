import React, { useState } from "react";
import axios from "axios";

interface LandingPageProps {
	onSubmit: (data: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSubmit }) => {
	const [steamId, setSteamId] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSteamId(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.get(`/api/steam/${steamId}`);
			onSubmit(response.data);
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};

	return (
		<div className="landing-page">
			<h1>Veux-tu te regarder dans le miroir ?</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter your SteamID"
					value={steamId}
					onChange={handleInputChange}
				/>
				<button type="submit">Envoyer</button>
			</form>
		</div>
	);
};

export default LandingPage;
