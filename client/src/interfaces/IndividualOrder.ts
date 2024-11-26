export interface IIndividualOrder {
	_id: string;
	dishes: { dishId: string; quantity: number }[];
	employee: string;
	companyOrder: string;
}
