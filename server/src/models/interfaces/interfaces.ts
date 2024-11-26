import { Types } from "mongoose";
import { Request } from "express";
import { OrderStatus, UserType } from "../enums/enums";

export interface ICompanyOrder {
	company: Types.ObjectId;
	collaboratorsOrders: Types.ObjectId[];
	createdAt: Date;
	status: OrderStatus;
	restaurant: Types.ObjectId;
}

export interface IIndividualOrder {
	dishes: {
		dishId: Types.ObjectId; // ID do prato (referência para o modelo Dish)
		quantity: number; // Quantidade do prato
	}[];
	employee: Types.ObjectId; // Referência para o Employee (quem fez o pedido)
	companyOrder: Types.ObjectId; // Referência para o CompanyOrder (o pedido da empresa)
}

export interface IUser extends Document {
	email: string;
	password: string;
	userType: UserType;
	verificationToken: string;
	verificationTokenExpireAt: Date;
	// authenticated: boolean;??
	//todo - keep or not ?
}

export interface IDish {
	_id: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	image: string;
	ratings: {
		userId: Types.ObjectId;
		rating: number;
	}[];
}

// Interface para o restaurante
export interface IRestaurant extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	dishes: IDish[];
	companyOrders: Types.ObjectId[];
}

export interface IEmployee extends IUser {
	name: string;
	cpf: string;
	company: Types.ObjectId;
	birthDate: Date;
	weeklyOrders: {
		Monday: Types.ObjectId;
		Tuesday: Types.ObjectId;
		Wednesday: Types.ObjectId;
		Thursday: Types.ObjectId;
		Friday: Types.ObjectId;
		Saturday: Types.ObjectId;
		Sunday: Types.ObjectId;
	};
}

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	affiliateRestaurants: Types.ObjectId[];
	employees: Types.ObjectId[];
}

export interface IValidations {
	name?: string;
	email?: string;
	password?: string;
	cep?: string;
	number?: number;
	cpf?: string;
	price?: number;
	description?: string;
	userType?: UserType;
	cnpj?: string;
}

export interface iJSONResponse {
	success: boolean;
	message: string;
	data: any;
}

export interface RequestWithUserId extends Request {
	userId?: string;
}
