import express from "express";
import cadastroController from "../controllers/cadastroController.js";

const routes = express.Router();

routes.get("/cadastro", cadastroController.listarcadastro);
routes.get("/cadastro/:id", cadastroController.listarcadastroPorId);
routes.post("/cadastro", cadastroController.adicionarCadastro);
routes.put("/cadastro/:id", cadastroController.atualizarcadastro);
routes.delete("/cadastro/:id", cadastroController.excluircadastro);
routes.put("/cadastro/prato/:id", cadastroController.adicionapratoRestaurante);

export default routes;
