import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRestaurantStore } from "../stores/restaurantStore";

type Props = {
	buttonText?: string;
	confirmText?: string;
	cancelText?: string;
	titleText?: string; // Propriedade para o título
	height?: string; // Nova propriedade para controlar a altura
	children: React.ReactNode;
	onConfirm?: () => void; // Função a ser executada no botão de confirmar
};

export default function FormDialog({
	buttonText = "Open modal",
	confirmText = "Criar",
	cancelText = "Cancelar",
	titleText = "Modal title",
	height = "auto",
	children,
	onConfirm,
}: Props) {
	const [open, setOpen] = React.useState(false);
	const { dishDTO, cleanDishDTO } = useRestaurantStore();

	titleText = dishDTO.name != "" ? dishDTO.name : titleText;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		cleanDishDTO();
		setOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (onConfirm) onConfirm(); // Executa a função passada
		handleClose();
	};

	return (
		<>
			<Button variant="contained" onClick={handleClickOpen}>
				{buttonText}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit,
				}}
			>
				<DialogTitle>{titleText}</DialogTitle>
				<DialogContent style={{ height, paddingTop: "0.5rem" }}>
					{children}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{cancelText}</Button>
					<Button type="submit" variant="contained">
						{confirmText}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
