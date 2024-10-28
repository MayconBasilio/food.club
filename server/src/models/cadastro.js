import mongoose from "mongoose";
import {pratoSchema} from "./Pratos.js"

const cadastroSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    email:{type:String, required:true},
    senha:{type:String, required:true},
    nome_da_empresa:{type:String, required:true},
    cnpj:{type:String,required:true},
    cep:{type:String, required:true},
    numero:{type:String, required:true},
    tipo:{type:String, },
    pratos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pratos'
    }],
    restaurantes_parceiros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registro'
    }],
    funcionarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registro'
    }]
}, { versionKey: false });

const empresa = mongoose.model("Registro", cadastroSchema);

export default empresa