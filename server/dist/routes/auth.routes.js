"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
//TODO - Verificar a parte do token, não está funcionando corretamente
router.post("/busignup", auth_controller_1.businessSignup);
router.post("/emsignup", auth_controller_1.employeeSignup);
router.post("/login", auth_controller_1.login);
router.get("/check-auth", verifyToken_1.verifyToken, auth_controller_1.checkAuth);
router.post("/logout", auth_controller_1.logout);
router.post("/email", auth_controller_1.getIsEmailAvailable);
router.get("/users", auth_controller_1.listUsers);
exports.default = router;
