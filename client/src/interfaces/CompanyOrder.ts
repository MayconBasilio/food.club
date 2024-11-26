import { OrderStatus } from "../enums/enums";
import { IIndividualOrder } from "./IndividualOrder";

export interface ICompanyOrder {
	dishes: any;
	company: string;
	collaboratorsOrders: IIndividualOrder[];
	createdAt: string;
	status: OrderStatus;
	restaurant: string;
	code: string;
}
