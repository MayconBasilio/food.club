"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const CompanySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    cep: { type: String, required: true },
    number: { type: String, required: true },
    affiliateRestaurants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    ],
    employeesId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Employee",
            default: [],
        },
    ],
});
exports.Company = User_1.User.discriminator("Company", CompanySchema);
