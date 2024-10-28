import express from "express";
import PratosController from "../controllers/PratosController.js";

const routes = express.Router();

routes.get("/pratos", PratosController.listarprato);
routes.get("/pratos/:id", PratosController.listarpratoPorId);
routes.post("/pratos", PratosController.adicionarPrato);
routes.put("/pratos/:id", PratosController.atualizarprato);
routes.delete("/pratos/:id", PratosController.excluirprato);


export default routes