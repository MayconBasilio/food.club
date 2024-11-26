"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const IndividualOrderSchema = new mongoose_1.default.Schema({
    dishes: {
        type: [
            {
                dishId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "Dish",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
        required: true,
        default: [],
    },
    employee: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    companyOrder: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "CompanyOrder",
        required: true,
    },
});
const IndividualOrder = mongoose_1.default.model("IndividualOrder", IndividualOrderSchema);
exports.IndividualOrder = IndividualOrder;
