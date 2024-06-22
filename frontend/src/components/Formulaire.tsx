import React, { useState } from "react";
import axios from "axios";

interface FormulaireProps {
	onSubmit: (data: any) => void;
}

const Formulaire: React.FC<FormulaireProps> = ({ onSubmit }) => {
	const [steamId, setSteamId] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSteamId(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:5000/api/steam/${steamId}`
			);
			onSubmit(response.data);
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};

	return (
		<form className="formulaire" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter your SteamID"
				value={steamId}
				onChange={handleInputChange}
			/>
			<button type="submit">Envoyer</button>
		</form>
	);
};

export default Formulaire;
