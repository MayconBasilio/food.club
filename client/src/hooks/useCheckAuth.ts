import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStores";

const useCheckAuth = (redirectIfUnauthenticated: string = "/login") => {
	const { checkAuth, isAuthenticated, user, isLoading } = useAuthStore();
	const navigate = useNavigate();
	const hasCheckedAuth = useRef(false);

	useEffect(() => {
		const verifyAuth = async () => {
			await checkAuth(); // Aguarda o estado ser atualizado

			// Obtém o estado diretamente após a atualização
			const { isAuthenticated, user } = useAuthStore.getState();
			console.log("isAuthenticated", isAuthenticated, "user", user);

			if (!isAuthenticated || !user) {
				navigate(redirectIfUnauthenticated, { replace: true });
			} else {
				navigate("/inicio", { replace: true });
			}
		};

		// Verifica a autenticação apenas uma vez
		if (!hasCheckedAuth.current && !isLoading) {
			hasCheckedAuth.current = true;
			verifyAuth();
		}
	}, [checkAuth, navigate, redirectIfUnauthenticated, isAuthenticated, user]);

	return { isAuthenticated, user, isLoading };
};

export default useCheckAuth;
