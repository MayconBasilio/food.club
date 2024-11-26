import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";
import "./Navbar.css";
import { navIconsList } from "./NavIconsList";

const Navbar = () => {
	const { user } = useAuthStore();

	if (user) {
		const filteredIcons = navIconsList.filter((icon) =>
			icon.iconFor.includes(user.userType)
		);

		return (
			<nav className="navbar-container">
				{filteredIcons.map(({ element, link, label, id }) => (
					<div key={id} className="nav-link-container">
						<NavLink to={link} className={`nav-link `}>
							<div className="nav-icon">{element}</div>
							<p>{label}</p>
						</NavLink>
					</div>
				))}
			</nav>
		);
	}
};

export default Navbar;
