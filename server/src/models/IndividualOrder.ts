import mongoose, { Schema, Document } from "mongoose";
import Dish from "./Dish"; // Importando o modelo Dish

// Definindo o schema do IndividualOrder
const individualOrderSchema = new Schema({
	companyOrder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CompanyOrder",
		required: true,
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: true,
	},
	dishes: [
		{
			dishId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Dish",
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
});

const IndividualOrder = mongoose.model(
	"IndividualOrder",
	individualOrderSchema
);

export default IndividualOrder;
