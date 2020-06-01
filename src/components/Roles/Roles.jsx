import React, { useContext, useState, useEffect } from "react";
import CustomAppBar from "../sections/AppBar";
import CustomDrawer from "../sections/Drawer";
import { DrawerContext } from "../contexts/AuthContext";
import { Container, makeStyles, Slide } from "@material-ui/core";
import { PageHeroTitle, CustomSkeleton } from "../customStyledComponents/Text";
import Axios from "axios";
import Role from "./Role";

const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(6),
	},
	cards: {
		marginTop: theme.spacing(2),
	},
}));
function Roles() {
	const classes = useStyles();
	const [drawerState, toggler] = useContext(DrawerContext);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	useEffect(() => {
		let isCancelled = false;
		const access_token = localStorage.getItem("jwt");
		const getRoles = async () => {
			const rs = await Axios.get("/roles", { headers: { access_token } });
			setRoles(rs.data);
		};
		const getUsers = async () => {
			const u = await Axios.get("/users", { headers: { access_token } });
			setUsers(u.data);
		};
		const getPermissions = async () => {
			const p = await Axios.get("/permissions", { headers: { access_token } });
			setPermissions(p.data);
		};
		if (!isCancelled) {
			getUsers();
			getRoles();
			getPermissions();
		}
		return () => {
			isCancelled = true;
		};
	}, []);

	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					<PageHeroTitle
						title='Roles'
						caption=' These are the roles and their respective permissions of users'
					/>
					{roles.length > 0 ? (
						roles
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((role) => (
								<Role
									key={role._id}
									role={role}
									users={users}
									permissions={permissions}
								/>
							))
					) : (
						<>
							<CustomSkeleton />
							<CustomSkeleton />
							<CustomSkeleton />
						</>
					)}
				</Container>
			</Slide>
		</div>
	);
}

export default Roles;
