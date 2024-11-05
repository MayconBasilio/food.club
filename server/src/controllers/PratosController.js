import { prato } from "../models/Pratos.js";

class pratocontroller {
	static async listarprato(req, res) {
		try {
			const listarprato = await prato.find({});
			res.status(200).json(listarprato);
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha na requisição` });
		}
	}
	static async listarpratoPorId(req, res) {
		try {
			const id = req.params.id;
			const pratoencontrado = await prato.findById(id);
			res.status(200).json(pratoencontrado);
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha na requisição` });
		}
	}

	static async adicionarPrato(req, res) {
		try {
			const novoprato = await prato.create(req.body);
			res.status(201).json({ message: "Criado com sucesso", prato: novoprato });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - falha ao cadastrar` });
		}
	}

	static async atualizarprato(req, res) {
		try {
			const id = req.params.id;
			await prato.findByIdAndUpdate(id, req.body);
			res.status(200).json({ message: "cadaastro atualizado" });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha ao atualizar` });
		}
	}
	static async excluirprato(req, res) {
		try {
			const id = req.params.id;
			await prato.findByIdAndDelete(id);
			res.status(200).json({ message: "excluido com sucesso" });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha ao excluir` });
		}
	}
}

export default pratocontroller;
