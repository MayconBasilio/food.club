import { UserType } from "../models/enums/enums";
import {
	ICompany,
	IEmployee,
	IRestaurant,
} from "../models/interfaces/interfaces";
import { Restaurant } from "./../models/Restaurant";

export const isEmail = (email: string) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

export const isValidCNPJ = (cnpj: string): boolean => {
	// Remove caracteres não numéricos
	cnpj = cnpj.replace(/\D/g, "");

	// Verifica se o CNPJ tem 14 dígitos
	if (cnpj.length !== 14) return false;

	// Verifica se todos os dígitos são iguais
	if (/^(\d)\1{13}$/.test(cnpj)) return false;

	// Cálculo do primeiro dígito verificador
	const calculateFirstDigit = (cnpj: string) => {
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
	const calculateSecondDigit = (cnpj: string) => {
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

	return (
		firstDigit === parseInt(cnpj.charAt(12), 10) &&
		secondDigit === parseInt(cnpj.charAt(13), 10)
	);
};

export const isValidCEP = (cep: string): boolean => {
	// Remove caracteres não numéricos
	cep = cep.replace(/\D/g, "");

	return cep.length === 8;
};
