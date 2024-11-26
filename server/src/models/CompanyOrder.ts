import mongoose from "mongoose";
import { OrderStatus } from "./enums/enums";
import { ICompanyOrder } from "./interfaces/interfaces";

const CompanyOrderSchema = new mongoose.Schema({
	company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
	collaboratorsOrders: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "IndividualOrder" },
	],
	createdAt: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: Object.values(OrderStatus),
		default: OrderStatus.PENDING,
	},
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
		required: true,
	},
	code: { type: String, required: true },
});

export const CompanyOrder = mongoose.model<ICompanyOrder>(
	"CompanyOrder",
	CompanyOrderSchema
);
