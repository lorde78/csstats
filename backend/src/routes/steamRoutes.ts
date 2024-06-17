import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const apiKey = process.env.STEAM_API_KEY;
const steamId = process.env.STEAM_ID;

console.log("API Key:", apiKey);
console.log("Steam ID:", steamId);

if (!apiKey || !steamId) {
	throw new Error(
		"Les variables d'environnement STEAM_API_KEY et STEAM_ID doivent être définies"
	);
}

router.get("/profile", async (req: Request, res: Response) => {
	try {
		const response = await axios.get(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
		);
		res.json(response.data.response.players[0]);
	} catch (error) {
		console.error("Error fetching Steam profile:", error);
		res.status(500).json({ message: "Server error", error });
	}
});

export default router;
