import { Outlet } from "react-router-dom";
import useCheckAuth from "../../hooks/useCheckAuth";

const PublicLayout = () => {
	useCheckAuth();
	return <Outlet />;
};

export default PublicLayout;
