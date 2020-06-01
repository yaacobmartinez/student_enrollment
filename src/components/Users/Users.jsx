import React, { useContext, useState, useEffect } from "react";
import CustomAppBar from "../sections/AppBar";
import CustomDrawer from "../sections/Drawer";
import { DrawerContext } from "../contexts/AuthContext";
import { Container, Button, makeStyles, Slide } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Axios from "axios";
import User from "./User";
import { PageHeroTitle, CustomSkeleton } from "../customStyledComponents/Text";
import NewUser from "./NewUser";
const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(6),
	},
	cards: {
		marginTop: theme.spacing(2),
	},
	btn: {
		textTransform: "none",
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(2),
			width: "100%",
		},
	},
}));
function Users() {
	const classes = useStyles();
	const [drawerState, toggler] = useContext(DrawerContext);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		let isCancelled = false;
		const jwt = localStorage.getItem("jwt");
		const fetchUsers = async () => {
			if (!isCancelled) {
				const users = await Axios.get("/users", {
					headers: { access_token: jwt },
				});
				setUsers(users.data);
			}
		};
		fetchUsers();
		return () => {
			isCancelled = true;
		};
	}, []);

	const [newUser, setNewUser] = useState(false);
	const toggleNewUser = () => {
		setNewUser(!newUser);
	};
	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					<PageHeroTitle
						title='Users'
						caption='All users allowed to login to the system'
						button={
							<Button
								className={classes.btn}
								color='primary'
								variant='outlined'
								onClick={toggleNewUser}
								startIcon={<Add />}>
								New User
							</Button>
						}
					/>
					<NewUser state={newUser} toggler={toggleNewUser} />
					<div className={classes.cards}>
						{users.length > 0 ? (
							users.map((user) => <User key={user._id} user={user} />)
						) : (
							<>
								<CustomSkeleton />
								<CustomSkeleton />
								<CustomSkeleton />
							</>
						)}
					</div>
				</Container>
			</Slide>
		</div>
	);
}

export default Users;
