import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "database.sqlite", // Le fichier de la base de données SQLite
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		// Synchroniser les modèles avec la base de données
		await sequelize.sync();
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		process.exit(1);
	}
};

export { sequelize, connectDB };
