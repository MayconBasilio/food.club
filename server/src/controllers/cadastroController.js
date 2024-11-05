import cadastro from "../models/cadastro.js";
import { prato } from "../models/Pratos.js";

class cadastrocontroller {
	static async listarcadastro(req, res) {
		try {
			const listarcadastro = await cadastro.find({});
			res.status(200).json(listarcadastro);
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha na requisição` });
		}
	}
	static async listarcadastroPorId(req, res) {
		try {
			const id = req.params.id;
			const cadastroencontrado = await cadastro.findById(id);
			res.status(200).json(cadastroencontrado);
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha na requisição` });
		}
	}

	static async adicionarCadastro(req, res) {
		try {
			const novocadastro = await cadastro.create(req.body);
			res
				.status(201)
				.json({ message: "Criado com sucesso", cadastro: novocadastro });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - falha ao cadastrar` });
		}
	}

	static async atualizarcadastro(req, res) {
		try {
			const id = req.params.id;
			await cadastro.findByIdAndUpdate(id, req.body);
			res.status(200).json({ message: "cadaastro atualizado" });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha ao atualizar` });
		}
	}
	static async excluircadastro(req, res) {
		try {
			const id = req.params.id;
			await cadastro.findByIdAndDelete(id);
			res.status(200).json({ message: "excluido com sucesso" });
		} catch (erro) {
			res.status(500).json({ message: `${erro.message} - Falha ao excluir` });
		}
	}

	static async adicionapratoRestaurante(req, res) {
		const pratoId = req.body.prato;
		try {
			// Verifica se o prato existe
			const pratoencontrado = await prato.findById(pratoId);
			if (!pratoencontrado) {
				return res.status(404).json({ message: "Prato não encontrado" });
			}

			// Usa req.params.id para combinar com a rota
			const restauranteId = req.params.id;
			const restauranteEncontrado = await cadastro.findById(restauranteId);

			if (!restauranteEncontrado) {
				return res.status(404).json({ message: "Restaurante não encontrado" });
			}

			// Adiciona o prato ao restaurante
			restauranteEncontrado.pratos.push(pratoId);
			await restauranteEncontrado.save();

			res.status(200).json({
				message: "Prato adicionado com sucesso",
				cadastro: restauranteEncontrado,
			});
		} catch (erro) {
			res.status(500).json({
				message: `${erro.message} - falha ao adicionar prato`,
			});
		}
	}
}

export default cadastrocontroller;
