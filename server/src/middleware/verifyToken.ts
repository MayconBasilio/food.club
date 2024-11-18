import jwt from "jsonwebtoken";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";

import { Request, Response, NextFunction } from "express";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log(req.cookies);
		const token = req.cookies.fctoken;

		if (!token) {
			res.status(401).json({ message: "Unauthorized - no token provided" });
			return;
		}

		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as jwt.JwtPayload;

		if (!decoded || typeof decoded.userId !== "string") {
			res.status(401).json({ message: "Unauthorized - invalid token" });
			return;
		}

		next();
	} catch (error) {
		console.log("Error verifying token: ", error);
		res.status(500).json({ message: "Error verifying token" });
		return;
	}
};

export const initialUSerToken = (
	user: IRestaurant | ICompany | IEmployee
): void => {
	const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();

	user.verificationToken = verificationToken;
	user.verificationTokenExpireAt = new Date(
		Date.now() + 7 * 24 * 60 * 60 * 1000
	);
};
