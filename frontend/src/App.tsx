import React, { useState, useEffect } from "react";
import "./index.css";
import { useQuery } from "react-query";
import { fetchSteamProfile, SteamProfile } from "./utils/fetchSteamProfile";
import {
	fetchCSGOStats,
	CSGOStats as CSGOStatsData,
} from "./utils/fetchCSGOStats";
import "./App.scss";
import Profil from "./components/Profil";

const App: React.FC = () => {
	const [profile, setProfile] = useState<SteamProfile | null>(null);
	const [csgoStats, setCsgoStats] = useState<
		{ name: string; value: number }[] | null
	>(null);
	const [view, setView] = useState<"ct" | "t">("ct");

	const {
		data: profileData,
		isLoading: isLoadingProfile,
		refetch: refetchProfile,
	} = useQuery<SteamProfile>("steamProfile", fetchSteamProfile, {
		enabled: false,
	});

	const {
		data: csgoData,
		isLoading: isLoadingCSGO,
		refetch: refetchCSGO,
	} = useQuery<CSGOStatsData>("csgoStats", fetchCSGOStats, {
		enabled: false,
	});

	useEffect(() => {
		const fetchData = async () => {
			const profileResult = await refetchProfile();
			if (profileResult.data) {
				setProfile(profileResult.data);
			}

			const csgoResult = await refetchCSGO();
			if (csgoResult.data) {
				setCsgoStats(csgoResult.data.stats);
			}
		};

		fetchData();
	}, [refetchProfile, refetchCSGO]);

	return (
		<div className={`App ${view}`}>
			<section>
				{isLoadingProfile && <p>Loading profile...</p>}
				{profile && csgoStats && (
					<Profil
						pseudo={profile.personaname}
						jeux={[]} // Replace with appropriate data
						photoProfil={profile.avatarfull}
						csgoStats={csgoStats}
						view={view}
					/>
				)}
			</section>
		</div>
	);
};

export default App;
