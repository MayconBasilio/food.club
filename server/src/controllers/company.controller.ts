import { Request, Response } from "express";
import { Company } from "../models/Company";
import { UserType } from "../models/enums/enums";
import { ICompany } from "../models/interfaces/interfaces";
import { CompanyOrder } from "../models/CompanyOrder";
import mongoose from "mongoose";

export const getCompanies = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const companies = await Company.find({ userType: UserType.COMPANY });
		return res.status(200).json({ success: true, data: companies });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar as empresas",
			error: error,
		});
	}
};

export const nextOrderCode = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const ordersCount = await CompanyOrder.countDocuments({});
		return `COD${ordersCount + 1}`;
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar o código do pedido",
			error: error,
		});
	}
};

export const createCompanyOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId, restaurantId } = req.params;
		const code = await nextOrderCode(req, res);

		if (!companyId || !code || !restaurantId) {
			return res.status(400).json({
				success: false,
				message: "Empresa, restaurante e código são obrigatórios",
			});
		}

		const todayOrderOpen = await checkIfOrderExists(companyId);

		if (todayOrderOpen) {
			return res.status(400).json({
				success: false,
				message: "Ja existe um pedido em aberto para hoje",
			});
		}

		const companyOrder = new CompanyOrder({
			company: companyId,
			code,
			restaurant: restaurantId,
		});
		await companyOrder.save();
		return res.status(200).json({ success: true, data: companyOrder });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao criar o pedido",
			error: error,
		});
	}
};

async function checkIfOrderExists(companyId: string) {
	try {
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const existingOrder = await CompanyOrder.findOne({
			company: companyId,
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		if (existingOrder) {
			return true;
		} else {
			// Se não existir um pedido
			return false;
		}
	} catch (error) {
		console.error("Erro ao verificar pedido:", error);
		throw new Error("Erro ao verificar pedido");
	}
}

export const getCompanyOrders = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId } = req.params;
		const orders = await CompanyOrder.find({ company: companyId }).populate(
			"collaboratorsOrders"
		);
		return res.status(200).json({ success: true, data: orders });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os pedidos",
			error: error,
		});
	}
};

export const getCompanyOrdersByRestaurant = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { restaurantId } = req.params;

		if (!restaurantId) {
			return res.status(400).json({
				success: false,
				message: "Restaurante obrigatório",
			});
		}

		// Converte o restaurantId para ObjectId, caso não seja
		const objectIdRestaurant = new mongoose.Types.ObjectId(restaurantId);

		const orders = await CompanyOrder.find({
			restaurant: objectIdRestaurant,
		}).populate("collaboratorsOrders");

		if (orders.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Nenhum pedido encontrado para este restaurante.",
			});
		}

		return res.status(200).json({ success: true, data: orders });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os pedidos",
			error,
		});
	}
};
