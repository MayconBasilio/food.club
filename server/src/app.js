import express from "express";
import conectaNaDatabase from "./config/dbConect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase()

conexao.on("error", (erro) =>{
    console.error("erro de conexão", erro);
})

conexao.once("open",()=>{
    console.log("conexão com o banco realizada")
})
const app = express();
routes(app)

export default app;
