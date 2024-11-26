import mongoose, { Schema, Document } from "mongoose";

const dishSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, default: null },
	ratings: {
		type: [
			{
				userId: { type: String, required: true },
				rating: { type: Number, required: true, max: 5 },
			},
		],
		default: [],
	},
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
