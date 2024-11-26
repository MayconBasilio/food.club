"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyOrdersByRestaurant = exports.getCompanyOrders = exports.createCompanyOrder = exports.nextOrderCode = exports.getCompanies = void 0;
const Company_1 = require("../models/Company");
const enums_1 = require("../models/enums/enums");
const CompanyOrder_1 = require("../models/CompanyOrder");
const mongoose_1 = __importDefault(require("mongoose"));
const getCompanies = async (req, res) => {
    try {
        const companies = await Company_1.Company.find({ userType: enums_1.UserType.COMPANY });
        return res.status(200).json({ success: true, data: companies });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar as empresas",
            error: error,
        });
    }
};
exports.getCompanies = getCompanies;
const nextOrderCode = async (req, res) => {
    try {
        const ordersCount = await CompanyOrder_1.CompanyOrder.countDocuments({});
        return `COD${ordersCount + 1}`;
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar o código do pedido",
            error: error,
        });
    }
};
exports.nextOrderCode = nextOrderCode;
const createCompanyOrder = async (req, res) => {
    try {
        const { companyId, restaurantId } = req.params;
        const code = await (0, exports.nextOrderCode)(req, res);
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
        const companyOrder = new CompanyOrder_1.CompanyOrder({
            company: companyId,
            code,
            restaurant: restaurantId,
        });
        await companyOrder.save();
        return res.status(200).json({ success: true, data: companyOrder });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao criar o pedido",
            error: error,
        });
    }
};
exports.createCompanyOrder = createCompanyOrder;
async function checkIfOrderExists(companyId) {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const existingOrder = await CompanyOrder_1.CompanyOrder.findOne({
            company: companyId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        if (existingOrder) {
            return true;
        }
        else {
            // Se não existir um pedido
            return false;
        }
    }
    catch (error) {
        console.error("Erro ao verificar pedido:", error);
        throw new Error("Erro ao verificar pedido");
    }
}
const getCompanyOrders = async (req, res) => {
    try {
        const { companyId } = req.params;
        const orders = await CompanyOrder_1.CompanyOrder.find({ company: companyId });
        return res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar os pedidos",
            error: error,
        });
    }
};
exports.getCompanyOrders = getCompanyOrders;
const getCompanyOrdersByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(400).json({
                success: false,
                message: "Restaurante obrigatório",
            });
        }
        // Converte o restaurantId para ObjectId, caso não seja
        const objectIdRestaurant = new mongoose_1.default.Types.ObjectId(restaurantId);
        // Adicionando console.log para depuração
        console.log("Buscando pedidos para o restaurante com ID:", objectIdRestaurant);
        // Realizando a consulta no banco
        const orders = await CompanyOrder_1.CompanyOrder.find();
        console.log(orders);
        // Verificando se retornou algum pedido
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nenhum pedido encontrado para este restaurante.",
            });
        }
        return res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Algo deu errado ao buscar os pedidos",
            error,
        });
    }
};
exports.getCompanyOrdersByRestaurant = getCompanyOrdersByRestaurant;
