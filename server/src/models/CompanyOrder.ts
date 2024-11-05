import mongoose from "mongoose";
import { OrderStatus } from "./enums/enums";
import { ICompanyOrder } from "./interfaces/interfaces";

const CompanyOrderSchema = new mongoose.Schema({
	company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
	collaboratorsOrders: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "IndividualOrder" },
	],
	createdAt: { type: Date, default: Date.now },
	status: { type: OrderStatus, default: OrderStatus.PENDING },
});

export const CompanyOrder = mongoose.model<ICompanyOrder>(
	"CompanyOrder",
	CompanyOrderSchema
);
