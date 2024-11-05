import mongoose from "mongoose";
import { IIndividualOrder } from "./interfaces/interfaces";

const IndividualOrderSchema = new mongoose.Schema({
	quantity: { type: Number, required: true },
	dish: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Dish",
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
	},
	companyOrder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CompanyOrder",
	},
});

const IndividualOrder = mongoose.model<IIndividualOrder>(
	"IndividualOrder",
	IndividualOrderSchema
);
