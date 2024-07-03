import axios from "axios";

export interface Game {
	appid: number;
	name: string;
	playtime_forever: number;
	img_icon_url: string;
	img_logo_url: string;
}

export const fetchGames = async (steamId: string): Promise<Game[]> => {
	try {
		console.log(`Fetching games for SteamID: ${steamId}...`);
		const response = await axios.get(
			`http://localhost:5000/api/steam/${steamId}/games`
		);
		console.log("Response data:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching games:", error);
		throw error;
	}
};
