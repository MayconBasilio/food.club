"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("./enums/enums");
const CompanyOrderSchema = new mongoose_1.default.Schema({
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Company" },
    collaboratorsOrders: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "IndividualOrder" },
    ],
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: Object.values(enums_1.OrderStatus),
        default: enums_1.OrderStatus.PENDING,
    },
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    code: { type: String, required: true },
});
exports.CompanyOrder = mongoose_1.default.model("CompanyOrder", CompanyOrderSchema);
