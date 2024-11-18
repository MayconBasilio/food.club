import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
		expiresIn: "7d",
	});
	res.cookie("fctoken", token, {
		httpOnly: true, //Cannot be accessed from frontend
		secure: process.env.NODE_ENV === "production" || false,
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};
