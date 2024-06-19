import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { fetchSteamProfile, SteamProfile } from "./utils/fetchSteamProfile";
import {
	fetchCSGOStats,
	CSGOStats as CSGOStatsData,
} from "./utils/fetchCSGOStats";
import {
	fetchSquadStats,
	SquadStats as SquadStatsData,
} from "./utils/fetchSquadStats";

import "./App.css";
import Profil from "./components/Profil";
import CSGOStats from "./components/CSGOStats";
import SquadStats from "./components/SquadStats";
import GameLibrary from "./components/GameLibrary";

const App: React.FC = () => {
	const [profile, setProfile] = useState<SteamProfile | null>(null);
	const [csgoStats, setCsgoStats] = useState<
		{ name: string; value: number }[] | null
	>(null);
	const [squadStats, setSquadStats] = useState<
		{ name: string; value: number }[] | null
	>(null);

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

	const {
		data: squadData,
		isLoading: isLoadingSquad,
		refetch: refetchSquad,
	} = useQuery<SquadStatsData>("squadStats", fetchSquadStats, {
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

			const squadResult = await refetchSquad();
			if (squadResult.data) {
				setSquadStats(squadResult.data.stats);
			}
		};

		fetchData();
	}, [refetchProfile, refetchCSGO, refetchSquad]);

	return (
		<Router>
			<div className="App">
				{isLoadingProfile && <p>Loading profile...</p>}
				{profile && (
					<Profil
						pseudo={profile.personaname}
						jeux={[]} // Replace with appropriate data
						photoProfil={profile.avatarfull}
					/>
				)}

				<Routes>
					<Route path="/" element={<GameLibrary />} />
					<Route
						path="/csgo"
						element={
							csgoStats ? (
								<CSGOStats stats={csgoStats} />
							) : (
								<p>Loading CS:GO stats...</p>
							)
						}
					/>
					<Route
						path="/squad"
						element={
							squadStats ? (
								<SquadStats stats={squadStats} />
							) : (
								<p>Loading Squad stats...</p>
							)
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
