import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const apiKey = process.env.STEAM_API_KEY;

if (!apiKey) {
	throw new Error(
		"La variable d'environnement STEAM_API_KEY doit être définie"
	);
}

router.get("/:steamId", async (req: Request, res: Response) => {
	const { steamId } = req.params;
	console.log(`Fetching data for SteamID: ${steamId}`);
	try {
		const profileResponse = await axios.get(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
		);
		const csgoResponse = await axios.get(
			`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${apiKey}&steamid=${steamId}`
		);
		const gamesResponse = await axios.get(
			`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`
		);
		const recentlyPlayedResponse = await axios.get(
			`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`
		);

		const responseData = {
			profile: profileResponse.data.response.players[0],
			stats: csgoResponse.data.playerstats.stats,
			games: gamesResponse.data.response.games,
			recentlyPlayed: recentlyPlayedResponse.data.response.games,
		};

		console.log("Fetched data:", responseData);

		res.status(200).json(responseData);
	} catch (error) {
		console.error("Error fetching data from Steam API:", error);
		res.status(500).json({ message: "Server error", error });
	}
});

export default router;
