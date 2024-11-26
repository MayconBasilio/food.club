import { create } from "zustand";
import { IRestaurant } from "../interfaces/restaurant";
import { IDishDTO } from "../DTO/dish.dto";
import axios from "axios";

const API_URL = "http://localhost:5000/api/restaurant/";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function handleAxiosError(error: unknown, set: Function) {
	//Função criada para cuidar dos erros que podem ser tanto em relação ao back-end, rede ou qualquer outro erro
	if (axios.isAxiosError(error) && error.response) {
		set({
			error: error.response.data.message || "Erro desconhecido.",
			isLoading: false,
		});
	} else {
		set({
			error: "Erro de conexão. Tente novamente mais tarde.",
			isLoading: false,
		});
	}
}

interface iRestaurantStore {
	restaurant: IRestaurant | null;
	isLoading: boolean;
	error: string;
	dishDTO: IDishDTO;
	message: string;
	updateDishDTO: (dishDTO: IDishDTO) => void;
	createDish: (dishDTO: IDishDTO) => Promise<void>;
	cleanDishDTO: () => void;
	listDishes: (restaurantId: string) => Promise<void>;
}

export const useRestaurantStore = create<iRestaurantStore>((set) => ({
	restaurant: null,
	isLoading: false,
	message: "",
	error: "",
	dishDTO: {
		name: "",
		description: "",
		price: 0,
		image: "",
		restaurantId: "",
	},

	updateDishDTO: (dishDTO: IDishDTO) => set({ dishDTO }),
	cleanDishDTO: () =>
		set({
			dishDTO: {
				name: "",
				description: "",
				price: 0,
				image: "",
				restaurantId: "",
			},
		}),
	createDish: async (dishDTO: IDishDTO) => {
		set({ isLoading: true, error: "" });

		try {
			const response = await axios.post(API_URL + "dish", dishDTO, {
				withCredentials: true,
			});

			if (!response.data.success) {
				set({
					error: response.data.message,
					isLoading: false,
					dishDTO: {
						name: "",
						description: "",
						price: 0,
						image: "",
						restaurantId: "",
					},
				});
				return;
			}

			set({ isLoading: false, message: response.data.message });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
	listDishes: async (restaurantId: string) => {
		try {
			const response = await axios.get(API_URL + restaurantId + "/dishes", {
				withCredentials: true,
			});
			return response.data.dishes;
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
}));
