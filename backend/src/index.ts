import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);

// In development, proxy React's dev server
if (process.env.NODE_ENV === "development") {
	app.use(
		"/",
		createProxyMiddleware({
			target: "http://localhost:3000",
			changeOrigin: true,
		})
	);
} else {
	// Serve static files from the React app (for production)
	app.use(express.static(path.join(__dirname, "../../frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
	});
}

// Middleware for error handling
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