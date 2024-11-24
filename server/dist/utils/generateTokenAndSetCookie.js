"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "secret", {
        expiresIn: "7d",
    });
    console.log("token no generateTokenAndSetCookie", token);
    return res.cookie("fctoken", token, {
        httpOnly: true, //Cannot be accessed from frontend
        secure: process.env.NODE_ENV === "production" || false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
