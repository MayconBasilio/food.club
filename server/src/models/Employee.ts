import mongoose from "mongoose";
import { User } from "./User";
import { IEmployee } from "./interfaces/interfaces";
import { UserType } from "./enums/enums";

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			default: [],
		},
	],
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
	birthDate: { type: Date, required: true },

	weeklyOrders: {
		Monday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Tuesday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Wednesday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Thursday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Friday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Saturday: { type: mongoose.Schema.Types.ObjectId, default: null },
		Sunday: { type: mongoose.Schema.Types.ObjectId, default: null },
	},

	UserType: {
		type: String,
		enum: Object.values(UserType),
		required: true,
		default: UserType.EMPLOYEE,
	},
});

export const Employee = User.discriminator<IEmployee>(
	"Employee",
	EmployeeSchema
);
