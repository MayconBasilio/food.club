import mongoose from "mongoose";
import { ICompany } from "./interfaces/interfaces";
import { User } from "./User";

const CompanySchema = new mongoose.Schema({
	name: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	number: { type: String, required: true },
	affiliateRestaurants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Restaurant",
		},
	],
	employeesId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
	],
});

export const Company = User.discriminator<ICompany>("Company", CompanySchema);
