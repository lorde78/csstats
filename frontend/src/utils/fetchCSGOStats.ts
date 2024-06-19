import axios from "axios";

export interface CSGOStats {
	steamID: string;
	gameName: string;
	stats: Array<{
		name: string;
		value: number;
	}>;
	achievements: Array<{
		name: string;
		achieved: number;
	}>;
}

export const fetchCSGOStats = async (): Promise<CSGOStats> => {
	try {
		console.log("Fetching CS:GO stats...");
		const response = await axios.get("http://localhost:5000/api/steam/csgo");
		console.log("Response data:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching CS:GO stats:", error);
		throw error;
	}
};
