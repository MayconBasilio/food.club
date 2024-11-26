import express from "express";
import {
	createIndividualOrder,
	getEmployees,
	getIndividualOrdersByCompanyOrder,
} from "../controllers/employee.controller";

const router = express.Router();

router.post("/:employeeId/order/:companyOrderId", createIndividualOrder);
router.get("/list", getEmployees);
router.get(
	"/:companyOrderId/individualorders",
	getIndividualOrdersByCompanyOrder
);

export default router;
