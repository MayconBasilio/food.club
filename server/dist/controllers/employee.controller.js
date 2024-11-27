"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndividualOrdersByCompanyOrder = exports.getEmployees = exports.createIndividualOrder = exports.getEmployeesByCompany = void 0;
const Employee_1 = require("../models/Employee");
const CompanyOrder_1 = require("../models/CompanyOrder");
const IndividualOrder_1 = __importDefault(require("../models/IndividualOrder"));
const getEmployeesByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Empresa é um campo obrigatório",
            });
        }
        const employees = await Employee_1.Employee.find({ company: companyId });
        return res.status(200).json({ success: true, data: employees });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar os funcionários",
            error: error,
        });
    }
};
exports.getEmployeesByCompany = getEmployeesByCompany;
const createIndividualOrder = async (req, res) => {
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
        const employee = await Employee_1.Employee.findById(employeeId);
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: "Funcionário não encontrado",
            });
        }
        const companyOrder = await CompanyOrder_1.CompanyOrder.findById(companyOrderId);
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
        const individualOrder = new IndividualOrder_1.default({
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao criar o pedido individual",
            error,
        });
    }
};
exports.createIndividualOrder = createIndividualOrder;
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee_1.Employee.find({});
        return res.status(200).json({ success: true, data: employees });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar os funcionários",
            error: error,
        });
    }
};
exports.getEmployees = getEmployees;
const getIndividualOrdersByCompanyOrder = async (req, res) => {
    try {
        const { companyOrderId } = req.params;
        const individualOrders = await IndividualOrder_1.default.find({
            companyOrder: companyOrderId,
        }).populate({
            path: "dishes.dishId",
            select: "-__v",
        });
        return res.status(200).json({ success: true, data: individualOrders });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Algo deu errado ao buscar os pedidos individuais",
                error: error.message,
            });
        }
    }
};
exports.getIndividualOrdersByCompanyOrder = getIndividualOrdersByCompanyOrder;
