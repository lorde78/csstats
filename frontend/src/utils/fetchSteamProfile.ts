import axios from "axios";

export interface SteamProfile {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	commentpermission: number;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	lastlogoff: number;
	personastate: number;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
	loccountrycode: string;
	locstatecode: string;
	loccityid: number;
}

export const fetchSteamProfile = async (): Promise<SteamProfile> => {
	try {
		console.log("Fetching Steam profile...");
		const response = await axios.get("http://localhost:5000/api/steam/profile");
		console.log("Response data:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching Steam profile:", error);
		throw error;
	}
};
