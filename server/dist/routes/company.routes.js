"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("./../controllers/company.controller");
const router = express_1.default.Router();
router.get("/list", company_controller_1.getCompanies);
router.get("/code", company_controller_1.nextOrderCode);
router.post("/:companyId/order/:restaurantId", company_controller_1.createCompanyOrder);
router.get("/:companyId/orders", company_controller_1.getCompanyOrders);
router.get("/restaurant/:restaurantId/orders", company_controller_1.getCompanyOrdersByRestaurant);
exports.default = router;
