"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialUSerToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.fctoken;
        console.log("token no verifyToken", token);
        if (!token) {
            res.status(401).json({ message: "Unauthorized - no token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded.userId !== "string") {
            res.status(401).json({ message: "Unauthorized - invalid token" });
            return;
        }
        next();
    }
    catch (error) {
        console.log("Error verifying token: ", error);
        res.status(500).json({ message: "Error verifying token" });
        return;
    }
};
exports.verifyToken = verifyToken;
const initialUSerToken = (user) => {
    const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
};
exports.initialUSerToken = initialUSerToken;
