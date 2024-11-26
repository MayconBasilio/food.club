import { IUser } from "./user";

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	affiliateRestaurants: string[]; // IDs dos restaurantes afiliados
	employeesId: string[]; // IDs dos funcionários
}
