import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/all/InitialPage";
import NotFoundPage from "./pages/all/NotFoundPage";
import Login from "./pages/all/Login";
import Register from "./components/Register";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
	{
		path: "/",
		element: <InitialPage />,
		errorElement: <NotFoundPage />,
	},
	{ path: "/login", element: <Login /> },
	{ path: "/cadastro", element: <Register /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<RouterProvider router={router} />
			</main>
		</ThemeProvider>
	</StrictMode>
);
