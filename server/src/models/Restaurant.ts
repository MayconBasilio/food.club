import mongoose, { Schema } from "mongoose";
import { User } from "./User";
import { IRestaurant } from "./interfaces/interfaces";
import { UserType } from "./enums/enums";
import Dish from "./Dish";

const RestaurantSchema = new Schema({
	name: { type: String, required: true },
	cnpj: { type: String, required: true },
	cep: { type: String, required: true },
	number: { type: String, required: true },
	dishes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish",
		},
	],
	companyOrders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CompanyOrder",
			default: [],
		},
	],
	userType: {
		type: String,
		enum: Object.values(UserType),
		required: true,
		default: UserType.RESTAURANT,
	},
});

export const Restaurant = User.discriminator<IRestaurant>(
	"Restaurant",
	RestaurantSchema
);
