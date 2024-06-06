require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

app.set("port", process.env.PORT || 3000);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/getnews", async function (req, res) {
	const { appid } = req.query;
	const url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=3&maxlength=300&format=json`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getachievementsperc", async function (req, res) {
	const { gameid } = req.query;
	const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameid}&format=json`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Requires AppId and name of achievement
app.get("/getglobalstats", async function (req, res) {
	const { appid, achievement } = req.query;
	const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=json&appid=${appid}&count=1&name[0]=${achievement}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getplayersummary", async function (req, res) {
	const { steamid } = req.query;
	const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamid}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getfriendlist", async function (req, res) {
	const { steamid } = req.query;
	const url = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&relationship=friend`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getplayerachievements", async function (req, res) {
	const { steamid, appid } = req.query;
	const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${STEAM_API_KEY}&steamid=${steamid}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Requires AppId and playerID
app.get("/getuserstats", async function (req, res) {
	const { appid, steamid } = req.query;
	const url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${STEAM_API_KEY}&steamid=${steamid}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getownedgames", async function (req, res) {
	const { steamid } = req.query;
	const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&format=json`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getrecentlyplayed", async function (req, res) {
	const { steamid } = req.query;
	const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&format=json`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/isplayingshared", async function (req, res) {
	const { steamid, appid_playing } = req.query;
	const url = `http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&appid_playing=${appid_playing}&format=json`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getschema", async function (req, res) {
	const { appid } = req.query;
	const url = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${appid}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/getbans", async function (req, res) {
	const { steamids } = req.query;
	const url = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${STEAM_API_KEY}&steamids=${steamids}`;
	try {
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Handle the root URL
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use(function (req, res) {
	res.type("text/plain");
	res.status(404).send("404 - Not Found");
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.type("plain/text");
	res.status(500).send("500 - Server Error");
});

app.listen(app.get("port"), function () {
	console.log(
		"Express started on http://localhost:" +
			app.get("port") +
			"; press Ctrl-C to terminate."
	);
});
