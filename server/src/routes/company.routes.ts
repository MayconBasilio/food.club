import express from "express";
import {
	createCompanyOrder,
	getCompanies,
	getCompanyOrders,
	getCompanyOrdersByRestaurant,
	nextOrderCode,
} from "./../controllers/company.controller";

const router = express.Router();

router.get("/list", getCompanies);
router.get("/code", nextOrderCode);
router.post("/:companyId/order/:restaurantId", createCompanyOrder);
router.get("/:companyId/orders", getCompanyOrders);
router.get("/restaurant/:restaurantId/orders", getCompanyOrdersByRestaurant);

export default router;
