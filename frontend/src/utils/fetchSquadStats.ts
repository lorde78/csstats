import axios from "axios";

export interface SquadStats {
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

export const fetchSquadStats = async (): Promise<SquadStats> => {
	try {
		console.log("Fetching Squad stats...");
		const response = await axios.get("http://localhost:5000/api/steam/squad");
		console.log("Response data:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching Squad stats:", error);
		throw error;
	}
};
