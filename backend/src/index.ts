import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import steamRoutes from "./routes/steamRoutes";

dotenv.config();

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/steam", steamRoutes); // Utilisation correcte de steamRoutes

if (process.env.NODE_ENV === "development") {
	app.use(
		"/",
		createProxyMiddleware({
			target: "http://localhost:3000",
			changeOrigin: true,
		})
	);
} else {
	app.use(express.static(path.join(__dirname, "../../frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
	});
}

app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(err.stack);
		res.status(500).json({ message: "Internal Server Error", error: err });
	}
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
