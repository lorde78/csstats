import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name, email, password });
		res.status(201).json(user);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Server error", error });
	}
};
