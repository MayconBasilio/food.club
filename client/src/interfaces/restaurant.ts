import { UserType } from "../enums/enums";
import { IUser } from "./user";

export interface IRestaurant extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	dishes: {
		id: string; // Agora, cada prato tem um ID
		name: string;
		description: string;
		price: number;
		image: string;
		ratings: { userId: string; rating: number }[];
	}[]; // Array de pratos com ID
	companyOrders: string[]; // IDs dos pedidos da empresa (referências para CompanyOrder)
	userType: UserType; // O tipo de usuário (deve ser 'RESTAURANT')
}
