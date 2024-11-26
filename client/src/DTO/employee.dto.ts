import { UserType } from "../enums/enums";

export interface iEmployeeDTO {
	email: string;
	password: string;
	cpf: string;
	name: string;
	company: string;
	birthDate: Date;
	userType: UserType;
}
