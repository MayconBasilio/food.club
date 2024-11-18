import React, { useState } from "react";

import "./LoginForm.css";
import { Button } from "@mui/material";
import GenericInput from "./GenericInput";
import EmailInput from "./EmailInput";
import logo from "../assets/Logo.svg";
// import axios from "axios";

const LoginForm = () => {
	const [password, setPassword] = useState<string>("");

	function handlePasswordChange(
		setPassword: React.Dispatch<React.SetStateAction<string>>
	) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.replace(/\s/g, ""); // Remove espaços
			setPassword(value);
		};
	}
	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		// const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
		// 	withCredentials: true,
		// });

		console.log(data);
	}

	return (
		<div id="loginForm">
			<div className="logo">
				<img src={logo} alt="logo da empresa" />
			</div>
			<form onSubmit={handleSubmit} className="form-principal">
				<h1>Entrar</h1>
				<EmailInput
					name="email"
					placeholder="Ex: sara@gmail.com"
					labelText="Email"
					required
				/>
				<GenericInput
					minLength={6}
					type="password"
					placeholder="Digite a sua senha"
					labelText="Digite a sua senha"
					name="password"
					value={password}
					onChange={handlePasswordChange(setPassword)}
				/>
				<Button variant="contained" color="primary" type="submit">
					Entrar
				</Button>

				<Button
					href="/cadastro"
					id="btn-cadastro"
					variant="contained"
					color="inherit"
				>
					Cadastrar
				</Button>
				<span>Esqueci a senha</span>
			</form>
		</div>
	);
};

export default LoginForm;
