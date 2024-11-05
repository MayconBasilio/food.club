import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
		expiresIn: "1d",
	});
	res.cookie("foodClubToken", token, {
		httpOnly: true, //Cannot be accessed from frontend
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000,
	});

	return token;
};
