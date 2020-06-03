import React, { useContext } from "react";
import CustomAppBar from "../sections/AppBar";
import CustomDrawer from "../sections/Drawer";
import { DrawerContext } from "../contexts/AuthContext";
import Welcome from "../sections/Welcome";

function Home() {
	const [drawerState, toggler] = useContext(DrawerContext);
	const actions = [
		{ href: "/app", title: "Home" },
		{ href: "/users", title: "Manage Users" },
		{ href: "/roles", title: "Manage User Roles and Permissions" },
	];
	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Welcome actions={actions} />
		</div>
	);
}

export default Home;
