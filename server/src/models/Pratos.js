import mongoose from "mongoose";

const pratoSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    nome_do_prato:{type:String, required:true},
    ingredientes:{type:Array, required:true},
    },{versionKey: false});

const prato = mongoose.model("pratos", pratoSchema);

export {prato, pratoSchema}