import { IRestaurant } from "../models/interfaces/interfaces";
import { User } from "../models/User";
import { isEmail, isValidCEP, isValidCNPJ } from "./helpers";
import { ICompany } from "./../models/interfaces/interfaces";

export const validateUserData = async (userData: IRestaurant | ICompany) => {
	if (!userData.email) {
		return { success: false, message: "O email é um campo obrigatório." };
	}

	const emailExists = await User.findOne({ email: userData.email });
	if (emailExists) {
		return {
			success: false,
			message: "O email informado não está disponível.",
			code: 409,
		};
	}

	if (isEmail(userData.email) === false) {
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

	if (isValidCNPJ(userData.cnpj) === false) {
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

	if (!isValidCEP(userData.cep)) {
		return { success: false, message: "O CEP é inválido. Deve ter 8 dígitos." };
	}

	return null; // Retorna null se não houver erros
};
