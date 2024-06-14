import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{
		tableName: "users",
		sequelize, // Passing the `sequelize` instance is required.
		timestamps: true, // Inclure `createdAt` et `updatedAt`
	}
);

export default User;
