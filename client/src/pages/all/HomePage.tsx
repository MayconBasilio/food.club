import useCheckAuth from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../stores/authStores";

const HomePage = () => {
	const { logout } = useAuthStore();
	useCheckAuth();

	async function handleLogout() {
		await logout();

		// Remover o cookie fctoken
		document.cookie =
			"fctoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; " +
			(window.location.protocol === "https:" ? "secure; " : "") + // Verifica se está usando HTTPS
			(process.env.NODE_ENV === "production"
				? "SameSite=None"
				: "SameSite=Strict");
	}

	return (
		<div>
			<button onClick={handleLogout}>Deslogar</button>
		</div>
	);
};

export default HomePage;
