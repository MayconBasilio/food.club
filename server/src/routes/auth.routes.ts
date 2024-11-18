import express from "express";
import {
	businessSignup,
	checkAuth,
	employeeSignup,
	login,
	logout,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);
router.post("/login", login);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);

export default router;
