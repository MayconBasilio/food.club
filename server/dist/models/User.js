"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("./enums/enums");
// prof - base option ?
const baseOptions = {
    discriminatorKey: "type",
    collection: "Users",
};
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: Object.values(enums_1.UserType), required: true },
    image: { type: String, default: null },
    verificationToken: { type: String, default: null },
    verificationTokenExpireAt: {
        type: Date,
        default: null,
    },
    lastLogin: { type: Date, default: null },
}, baseOptions);
exports.User = mongoose_1.default.model("User", UserSchema);
