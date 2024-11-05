import mongoose from "mongoose";
import { IEmployee } from "./interfaces/interfaces";
import { User } from "./User";

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	],
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
	},
	birthDate: { type: Date, required: true },
});

export const Employee = User.discriminator<IEmployee>(
	"Employee",
	EmployeeSchema
);
