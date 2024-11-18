import mongoose from "mongoose";
import { UserType } from "./enums/enums";

// prof - base option ?

const baseOptions = {
	discriminatorKey: "type",
	collection: "Users",
};

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		userType: { type: String, enum: Object.values(UserType), required: true },
		verificationToken: { type: String, default: null },
		verificationTokenExpireAt: {
			type: Date,
			default: null,
		},
		lastLogin: { type: Date, default: null },
	},
	baseOptions
);

export const User = mongoose.model("User", UserSchema);
