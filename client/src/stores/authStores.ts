import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth/";

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

interface iAuthStore {
	user: unknown;
	isAuthenticated: boolean;
	role: string;
	isLoading: boolean;
	error: string;
	login: (email: string, password: string) => Promise<void>;
	checkAuth: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<iAuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: "",
	role: "",

	checkAuth: async () => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.get(API_URL + "check-auth", {
				withCredentials: true,
			});

			if (response.data.success) {
				set({ isAuthenticated: true, isLoading: false, user: response.data.user });
			} else {
				set({ isAuthenticated: false, isLoading: false, user: null });
			}
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(
				API_URL + "login",
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	logout: async () => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(API_URL + "logout", {
				withCredentials: true,
			});
			console.log(response);

			if (response.data.success) {
				// Deletando o cookie 'fctoken' no cliente

				set({ user: null, isAuthenticated: false, isLoading: false });
				return;
			}

			set({ user: null, isAuthenticated: false, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
}));
