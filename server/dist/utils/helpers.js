"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCEP = exports.isValidCNPJ = exports.isEmail = void 0;
const isEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};
exports.isEmail = isEmail;
const isValidCNPJ = (cnpj) => {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, "");
    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14)
        return false;
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj))
        return false;
    // Cálculo do primeiro dígito verificador
    const calculateFirstDigit = (cnpj) => {
        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj.charAt(i), 10) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };
    // Cálculo do segundo dígito verificador
    const calculateSecondDigit = (cnpj) => {
        let sum = 0;
        let weight = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj.charAt(i), 10) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };
    // Verifica os dígitos verificadores
    const firstDigit = calculateFirstDigit(cnpj);
    const secondDigit = calculateSecondDigit(cnpj);
    return (firstDigit === parseInt(cnpj.charAt(12), 10) &&
        secondDigit === parseInt(cnpj.charAt(13), 10));
};
exports.isValidCNPJ = isValidCNPJ;
const isValidCEP = (cep) => {
    // Remove caracteres não numéricos
    cep = cep.replace(/\D/g, "");
    return cep.length === 8;
};
exports.isValidCEP = isValidCEP;
