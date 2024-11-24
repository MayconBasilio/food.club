"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const IndividualOrderSchema = new mongoose_1.default.Schema({
    quantity: { type: Number, required: true },
    dish: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Dish",
    },
    employee: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Employee",
    },
    companyOrder: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "CompanyOrder",
    },
});
const IndividualOrder = mongoose_1.default.model("IndividualOrder", IndividualOrderSchema);
