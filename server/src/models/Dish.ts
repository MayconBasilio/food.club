import mongoose from "mongoose";
import { IDish } from "./interfaces/interfaces";

const DishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
	},
});

export const Dish = mongoose.model<IDish>("Dish", DishSchema);
