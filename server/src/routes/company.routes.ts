import express from "express";
import { getCompanies } from "./../controllers/company.controller";

const router = express.Router();

router.get("/companies", getCompanies);

export default router;
