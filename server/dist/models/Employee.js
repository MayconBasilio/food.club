"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const enums_1 = require("./enums/enums");
const EmployeeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order",
            default: [],
        },
    ],
    company: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    birthDate: { type: Date, required: true },
    weeklyOrders: {
        Monday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Tuesday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Wednesday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Thursday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Friday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Saturday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
        Sunday: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
    },
    UserType: {
        type: String,
        enum: Object.values(enums_1.UserType),
        required: true,
        default: enums_1.UserType.EMPLOYEE,
    },
});
exports.Employee = User_1.User.discriminator("Employee", EmployeeSchema);
