"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.getIsEmailAvailable = exports.checkAuth = exports.businessSignup = exports.employeeSignup = exports.login = exports.logout = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Restaurant_1 = require("../models/Restaurant");
const validations_1 = require("../utils/validations");
const enums_1 = require("../models/enums/enums");
const Employee_1 = require("../models/Employee");
const verifyToken_1 = require("../middleware/verifyToken");
const generateTokenAndSetCookie_1 = require("../utils/generateTokenAndSetCookie");
const Company_1 = require("../models/Company");
//#endregion
const logout = async (req, res) => {
    res.clearCookie("fctoken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    return res.status(200).json({ success: true, message: "Logout efetuado." });
};
exports.logout = logout;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(404)
                .json({ success: false, message: "Email e senha são obrigatórios." });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Email ou senha inválido." });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(404)
                .json({ success: false, message: "Email ou senha inválido." });
        }
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user._id.toString());
        user.lastLogin = new Date();
        await user.save();
        user.password = "";
        return res
            .status(200)
            .json({ success: true, message: "Login efetuado com sucesso.", user: user });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "algo deu errado ao fazer login." + error,
        });
    }
};
exports.login = login;
const employeeSignup = async (req, res) => {
    const userData = req.body;
    try {
        const invalidField = await (0, validations_1.validateEmployeeData)(userData);
        if (invalidField) {
            return res.status(invalidField.code || 400).json(invalidField);
        }
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        userData.password = hashedPassword;
        (0, verifyToken_1.initialUSerToken)(userData);
        const user = new Employee_1.Employee(userData);
        await user.save();
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user._id.toString());
        return res
            .status(201)
            .json({ success: true, message: "Funcionário Cadastrado." });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "algo deu errado ao criar o funcionário." + error,
        });
    }
};
exports.employeeSignup = employeeSignup;
const businessSignup = async (req, res) => {
    const userData = req.body;
    try {
        const invalidField = await (0, validations_1.validateUserData)(userData);
        if (invalidField)
            return res.status(invalidField.code || 400).json(invalidField);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        userData.password = hashedPassword;
        (0, verifyToken_1.initialUSerToken)(userData);
        if (userData.userType === enums_1.UserType.RESTAURANT) {
            const user = new Restaurant_1.Restaurant(userData);
            await user.save();
            (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user._id.toString());
            return res
                .status(201)
                .json({ success: true, message: "Restaurante Cadastrado." });
        }
        else if (userData.userType === enums_1.UserType.COMPANY) {
            const user = new Company_1.Company(userData);
            await user.save();
            (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user._id.toString());
            return res
                .status(201)
                .json({ success: true, message: "Empresa Cadastrada." });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `algo deu errado ao criar ${enums_1.UserType.COMPANY ? "a empresa." : "o restaurante."} + error`,
        });
    }
};
exports.businessSignup = businessSignup;
const checkAuth = async (req, res) => {
    const token = req.cookies.fctoken;
    if (!token) {
        res.status(401).json({ message: "Unauthorized - no token provided" });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await User_1.User.findById(decoded.userId);
    console.log(user);
    if (!user) {
        res.clearCookie("fctoken");
        res
            .status(401)
            .json({ success: false, message: "Unauthorized - invalid token" });
        return;
    }
    user.password = "";
    res.status(200).json({ success: true, message: "Authorized", user: user });
    return;
};
exports.checkAuth = checkAuth;
const getIsEmailAvailable = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User_1.User.findOne({ email });
        if (user) {
            res.status(400).json({ available: false, message: "Email já cadastrado." });
            return;
        }
        else {
            res.status(200).json({ available: true, message: "Email disponível." });
            return;
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ available: false, message: "Erro interno do servidor." });
        return;
    }
};
exports.getIsEmailAvailable = getIsEmailAvailable;
const listUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        return res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "algo deu errado ao listar os usuários." + error,
        });
    }
};
exports.listUsers = listUsers;
