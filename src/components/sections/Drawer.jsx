import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Divider,
} from "@material-ui/core";
import {
	HomeRounded,
	Menu,
	Person,
	SupervisedUserCircle,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
}));
function CustomDrawer({ state, toggler }) {
	const classes = useStyles();
	const list = [
		{ href: "/app", title: "Home", icon: <HomeRounded /> },
		{ href: "/users", title: "Users", icon: <Person /> },
		{ href: "/roles", title: "Roles", icon: <SupervisedUserCircle /> },
	];
	return (
		<div>
			<Drawer anchor='left' open={state} onClose={toggler}>
				<div className={classes.toolbar}>
					<List>
						<ListItem button onClick={toggler}>
							<ListItemIcon>
								<Menu />
							</ListItemIcon>
						</ListItem>
					</List>
				</div>
				<Divider />
				<List style={{ width: 250 }}>
					{list.map((item) => (
						<ListItem button component='a' href={item.href} key={item.href}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	);
}

export default CustomDrawer;
