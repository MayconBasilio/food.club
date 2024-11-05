//#region Imports
import { Request, Response } from "express";
import { IRestaurant } from "../models/interfaces/interfaces";
import { Restaurant } from "../models/Restaurant";
import { User } from "../models/User";
import { validateUserData } from "../utils/validations";
import bcrypt from "bcrypt";

//#endregion

export const signup = async (req: Request, res: Response): Promise<any> => {
	const userData: IRestaurant = req.body;

	const invalidField = await validateUserData(userData);
	if (invalidField) {
		return res.status(invalidField.code || 400).json(invalidField);
	}

	const hashedPassword = await bcrypt.hash(userData.password, 10);
	userData.password = hashedPassword;

	const user = new Restaurant(userData);

	try {
		await user.save();
		return res.status(201).json({ success: true, message: "Usuário criado." });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Erro ao criar o usuário." });
	}
};
