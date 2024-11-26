import express from "express";
import {
	businessSignup,
	checkAuth,
	employeeSignup,
	getIsEmailAvailable,
	listUsers,
	login,
	logout,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

//TODO - Verificar a parte do token, não está funcionando corretamente

router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);
router.post("/login", login);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);
router.post("/email", getIsEmailAvailable);
router.get("/users", listUsers);

export default router;
