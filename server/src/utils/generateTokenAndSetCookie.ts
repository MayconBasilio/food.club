import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
		expiresIn: "7d",
	});

	console.log("token no generateTokenAndSetCookie", token);

	res.cookie("fctoken", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 24 * 60 * 60 * 1000,
	});
};
