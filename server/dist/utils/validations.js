"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = exports.validateEmployeeData = void 0;
const User_1 = require("../models/User");
const helpers_1 = require("./helpers");
const validateEmployeeData = async (userData) => {
    if (!userData.email) {
        return { success: false, message: "O email é um campo obrigatório." };
    }
    const emailExists = await User_1.User.findOne({ email: userData.email });
    if (emailExists) {
        return {
            success: false,
            message: "O email informado não está disponível.",
            code: 409,
        };
    }
    if ((0, helpers_1.isEmail)(userData.email) === false) {
        return { success: false, message: "O email é inválido." };
    }
    if (!userData.password) {
        return { success: false, message: "A senha é um campo obrigatório." };
    }
    if (userData.password.length < 6) {
        return {
            success: false,
            message: "A senha deve ter pelo menos 6 caracteres.",
        };
    }
    if (!userData.cpf) {
        return { success: false, message: "O CPF é um campo obrigatório." };
    }
    if (userData.cpf.length < 11) {
        return { success: false, message: "O CPF deve ter 11 dígitos." };
    }
    if (/^\d{11}$/.test(userData.cpf) === false) {
        return { success: false, message: "O CPF deve conter apenas dígitos." };
    }
    if (!userData.name) {
        return { success: false, message: "O nome é um campo obrigatório." };
    }
    if (userData.name.length < 3) {
        return {
            success: false,
            message: "O nome deve ter pelo menos 3 caracteres.",
        };
    }
    if (!userData.company) {
        return {
            success: false,
            message: "A empresa é um campo obrigatório.",
        };
    }
    if (!userData.birthDate) {
        return {
            success: false,
            message: "A data de nascimento é um campo obrigatório.",
        };
    }
    else if (new Date(userData.birthDate) > new Date()) {
        return {
            success: false,
            message: "A data de nascimento é inválida.",
        };
    }
};
exports.validateEmployeeData = validateEmployeeData;
const validateUserData = async (userData) => {
    if (!userData.email) {
        return { success: false, message: "O email é um campo obrigatório." };
    }
    const emailExists = await User_1.User.findOne({ email: userData.email });
    if (emailExists) {
        return {
            success: false,
            message: "O email informado não está disponível.",
            code: 409,
        };
    }
    if ((0, helpers_1.isEmail)(userData.email) === false) {
        return { success: false, message: "O email é inválido." };
    }
    if (!userData.password) {
        return { success: false, message: "A senha é um campo obrigatório." };
    }
    if (userData.password.length < 6) {
        return {
            success: false,
            message: "A senha deve ter pelo menos 6 caracteres.",
        };
    }
    if (!userData.name) {
        return { success: false, message: "O nome é um campo obrigatório." };
    }
    if (userData.name.length < 3) {
        return {
            success: false,
            message: "O nome deve ter pelo menos 3 caracteres.",
        };
    }
    if (!userData.cnpj) {
        return { success: false, message: "O CNPJ é um campo obrigatório." };
    }
    if ((0, helpers_1.isValidCNPJ)(userData.cnpj) === false) {
        return { success: false, message: "O CNPJ é inválido." };
    }
    if (!userData.number) {
        return { success: false, message: "O número é um campo obrigatório." };
    }
    if (parseInt(userData.number) <= 0) {
        return { success: false, message: "O número deve ser maior que zero." };
    }
    if (!userData.cep) {
        return { success: false, message: "O CEP é um campo obrigatório." };
    }
    if (!(0, helpers_1.isValidCEP)(userData.cep)) {
        return { success: false, message: "O CEP é inválido. Deve ter 8 dígitos." };
    }
    return null; // Retorna null se não houver erros
};
exports.validateUserData = validateUserData;
