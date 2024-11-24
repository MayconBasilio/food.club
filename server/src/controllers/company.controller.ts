import { Request, Response } from "express";
import { Company } from "../models/Company";
import { UserType } from "../models/enums/enums";
import { ICompany } from "../models/interfaces/interfaces";

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
