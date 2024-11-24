"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = void 0;
const Company_1 = require("../models/Company");
const enums_1 = require("../models/enums/enums");
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
