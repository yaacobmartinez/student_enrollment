import React, { useContext } from "react";
import CustomAppBar from "../sections/AppBar";
import CustomDrawer from "../sections/Drawer";
import { DrawerContext } from "../contexts/AuthContext";
import Welcome from "../sections/Welcome";

function Home() {
	const [drawerState, toggler] = useContext(DrawerContext);
	const actions = [{ href: "/app", title: "Home" }];
	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Welcome actions={actions} />
		</div>
	);
}

export default Home;
