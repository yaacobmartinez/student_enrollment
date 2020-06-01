import React, { useContext } from "react";
import CustomAppBar from "./AppBar";
import {
	Container,
	Typography,
	makeStyles,
	Link,
	Slide,
} from "@material-ui/core";
import CustomDrawer from "./Drawer";
import { DrawerContext } from "../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(10),
		textAlign: "right",
	},
}));
function YouLostBro() {
	const classes = useStyles();
	const [drawerState, toggler] = useContext(DrawerContext);
	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					<Typography variant='h1'>You Lost Bro?</Typography>
					<Link href='/app'>
						<Typography variant='h5' style={{ color: "#000" }}>
							Let's go back.
						</Typography>
					</Link>
				</Container>
			</Slide>
		</div>
	);
}

export default YouLostBro;
