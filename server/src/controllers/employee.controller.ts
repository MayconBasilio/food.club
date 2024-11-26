import { Request, Response } from "express";
import { Employee } from "../models/Employee";
import { CompanyOrder } from "../models/CompanyOrder";
import IndividualOrder from "../models/IndividualOrder";

export const getEmployeesByCompany = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyId } = req.params;

		if (!companyId) {
			return res.status(400).json({
				success: false,
				message: "Empresa é um campo obrigatório",
			});
		}

		const employees = await Employee.find({ company: companyId });
		return res.status(200).json({ success: true, data: employees });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os funcionários",
			error: error,
		});
	}
};

export const createIndividualOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { employeeId, companyOrderId } = req.params;
		const { dishes } = req.body;

		if (dishes.length === 0) {
			return res.status(400).json({
				success: false,
				message: "O pedido individual precisa de pelo menos um prato",
			});
		}

		if (!employeeId || !companyOrderId) {
			return res.status(400).json({
				success: false,
				message: "Funcionário e pedido obrigatórios",
			});
		}

		const employee = await Employee.findById(employeeId);

		if (!employee) {
			return res.status(400).json({
				success: false,
				message: "Funcionário não encontrado",
			});
		}

		const companyOrder = await CompanyOrder.findById(companyOrderId);

		if (!companyOrder) {
			return res.status(400).json({
				success: false,
				message: "Pedido nao encontrado",
			});
		}

		if (employee.company.toString() !== companyOrder.company.toString()) {
			return res.status(400).json({
				success: false,
				message: "Funcionário nao pertence a empresa do pedido",
			});
		}

		const individualOrder = new IndividualOrder({
			employee: employeeId,
			companyOrder: companyOrderId,
			dishes,
		});

		companyOrder.collaboratorsOrders.push(individualOrder._id);

		await companyOrder.save();
		await individualOrder.save();

		return res.status(201).json({
			success: true,
			message: "Pedido individual criado com sucesso",
			data: individualOrder,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao criar o pedido individual",
			error,
		});
	}
};

export const getEmployees = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const employees = await Employee.find({});
		return res.status(200).json({ success: true, data: employees });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Algo deu errado ao buscar os funcionários",
			error: error,
		});
	}
};

export const getIndividualOrdersByCompanyOrder = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const { companyOrderId } = req.params;
		const individualOrders = await IndividualOrder.find({
			companyOrder: companyOrderId,
		}).populate({
			path: "dishes.dishId",
			select: "-__v",
		});
		return res.status(200).json({ success: true, data: individualOrders });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({
				success: false,
				message: "Algo deu errado ao buscar os pedidos individuais",
				error: error.message,
			});
		}
	}
};
