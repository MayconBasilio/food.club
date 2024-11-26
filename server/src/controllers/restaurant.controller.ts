import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";
import { IRestaurant } from "../models/interfaces/interfaces";
import mongoose from "mongoose";

export const getDishes = async (req: Request, res: Response): Promise<any> => {
	try {
		const { restaurantId } = req.body;

		if (!restaurantId) {
			return res
				.status(400)
				.json({ success: false, message: "É necessário informar o restaurante" });
		}

		const restaurant: IRestaurant | null = await Restaurant.findById(
			restaurantId
		);

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, error: "Restaurante não encontrado" });
		}

		return res.status(200).json({ success: true, data: restaurant.dishes });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Algo deu errado ao buscar os pratos" });
	}
};

export const updateDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { restaurantId, dishId } = req.params; // IDs do restaurante e do prato
		const { name, description, price, image } = req.body;

		// Verifica se o ID do prato foi fornecido
		if (!dishId) {
			return res.status(400).json({
				success: false,
				message: "É necessário informar o prato a ser atualizado",
			});
		}

		// Verifica se todos os campos são vazios
		if (!name && !description && !price && !image) {
			return res.status(400).json({
				success: false,
				message:
					"É necessário fornecer ao menos um campo (name, description ou price) para atualizar",
			});
		}

		// Busca o restaurante pelo ID
		const restaurant = await Restaurant.findById(restaurantId);

		if (!restaurant) {
			return res.status(404).json({
				success: false,
				message: "Restaurante não encontrado",
			});
		}

		// Atualiza o prato dentro do array `dishes`
		let dishUpdated = false;
		restaurant.dishes = restaurant.dishes.map((dish) => {
			if (dish._id.toString() === dishId) {
				if (name) dish.name = name;
				if (description) dish.description = description;
				if (price) dish.price = price;
				if (image) dish.image = image;
				dishUpdated = true;
			}
			return dish;
		});

		// Verifica se o prato foi encontrado
		if (!dishUpdated) {
			return res.status(404).json({
				success: false,
				message: "Prato não encontrado no restaurante",
			});
		}

		// Salva as mudanças no restaurante
		await restaurant.save();

		return res.status(200).json({
			success: true,
			message: "Prato atualizado com sucesso",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao atualizar o prato: " + error,
		});
	}
};

export const deleteDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { dishId, restaurantId } = req.params;

		if (!dishId) {
			return res
				.status(400)
				.json({ success: false, message: "É necessário informar o prato" });
		}

		const restaurant = await Restaurant.findById(restaurantId);

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante não encontrado" });
		}

		const dishExists = restaurant.dishes.some(
			(dish) => dish._id.toString() === dishId
		);

		if (!dishExists) {
			return res
				.status(404)
				.json({ success: false, message: "Prato não encontrado" });
		}

		// Remove o prato da lista
		restaurant.dishes = restaurant.dishes.filter(
			(dish) => dish._id.toString() !== dishId
		);

		await restaurant.save();

		return res
			.status(200)
			.json({ success: true, message: "Prato excluído com sucesso" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Algo deu errado ao excluir o prato" });
	}
};

export const createDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, description, price, image, restaurantId } = req.body;

		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante não encontrado" });
		}

		const newDish = {
			_id: new mongoose.Types.ObjectId(),
			name,
			description,
			price,
			ratings: [],
			image,
		};

		restaurant.dishes.push(newDish);

		await restaurant.save();

		return res.status(201).json({
			success: true,
			message: "Prato adicionado com sucesso",
			dish: newDish,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Erro ao adicionar o prato" });
	}
};

export const getRestaurants = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const restaurants = await Restaurant.find({});
		return res.status(200).json({ success: true, data: restaurants });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os restaurantes",
			error: error,
		});
	}
};

export const getRestaurant = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id);
		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante nao encontrado" });
		}
		return res.status(200).json({ success: true, data: restaurant });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar o restaurante",
			error: error,
		});
	}
};

export const ratingDish = async (req: Request, res: Response): Promise<any> => {
	try {
		const { dishId, restaurantId } = req.params;
		const { userId, rating } = req.body;
		const restaurant = await Restaurant.findById(restaurantId);
		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: "Restaurante nao encontrado" });
		}
		const dish = restaurant.dishes.find((dish) => dish._id.toString() === dishId);
		if (!dish) {
			return res
				.status(404)
				.json({ success: false, message: "Prato nao encontrado" });
		}

		dish.ratings.push({ userId, rating });

		await restaurant.save();
		return res
			.status(200)
			.json({ success: true, message: "Avaliação enviada com sucesso" });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao avaliar o prato",
			error: error,
		});
	}
};
