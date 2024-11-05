export enum UserType {
	COMPANY = "company",
	RESTAURANT = "restaurant",
	EMPLOYEE = "employee",
}

export enum OrderStatus {
	PENDING = "pending",
	CONFIRMED = "confirmed",
	PREPARING = "preparing",
	DELIVERED = "delivered",
	CANCELLED = "cancelled",
}

export enum ErrorMessages {
	EMPTY_EMAIL = "Email é um campo obrigatório.",
	EMPTY_PASSWORD = "Senha é um campo obrigatório.",
	EMPTY_NAME = "O nome é um campo obrigatório.",
	EMPTY_CEP = "O CEP é um campo obrigatório.",
	EMPTY_NUMBER = "O número é um campo obrigatório.",
	EMPTY_CPF = "CPF é um campo obrigatório.",
	EMPTY_PRICE = "O preço é um campo obrigatório.",
	EMPTY_DESCRIPTION = "A descrição é um campo obrigatório.",
	EMPTY_CNPJ = "O CNPJ é um campo obrigatório.",

	TOO_SHORT_NAME = "O nome precisa ter pelo menos 3 caracteres",
	EMAIL_NOT_VALID = "O email é inválido.",
	INVALID_PASSWORD = "senha inválida. Deve ter pelo menos 6 caracteres.",
	INVALID_CEP = "CEP inválido. Deve ter 8 dígitos.",
	INVALID_NUMBER = "Número inválido. Deve ser maior que zero.",
	INVALID_CPF = "CPF inválido. Deve ter 11 dígitos.",
	INVALID_DESCRIPTION = "Descrição inválida. Deve ter pelo menos 20 letras.",
	INVALID_PRICE = "Preço inválido. Deve ser maior que zero.",

	EMAIL_ALREADY_USED = "O email informado já está em uso.",
	INVALID_CNPJ = "CNPJ inválido. Deve ter 14 dígitos.",
}
