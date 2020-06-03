import React, { useContext, useState, useEffect } from "react";
import { DrawerContext } from "../../contexts/AuthContext";
import CustomAppBar from "../../sections/AppBar";
import CustomDrawer from "../../sections/Drawer";
import { Slide, Container, makeStyles } from "@material-ui/core";
import {
	PageHeroTitle,
	CustomTitleSkeleton,
} from "../../customStyledComponents/Text";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(6),
	},
}));
function User(props) {
	const [user, setUser] = useState();
	const id = props.match.params.id;
	useEffect(() => {
		let isCancelled = false;
		const access_token = localStorage.getItem("jwt");
		const getUser = async () => {
			const u = await Axios.get(`/users/${id}`, { headers: { access_token } });
			setUser(u.data);
		};
		if (!isCancelled) {
			getUser();
		}
		return () => {
			isCancelled = true;
		};
	}, [id]);
	const classes = useStyles();
	const [drawerState, toggler] = useContext(DrawerContext);
	return (
		<div>
			<CustomAppBar toggler={toggler} />
			<CustomDrawer state={drawerState} toggler={toggler} />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					{user ? (
						<PageHeroTitle
							title={`${user.first_name} ${user.last_name}`}
							caption={user.email}
						/>
					) : (
						<CustomTitleSkeleton />
					)}
				</Container>
			</Slide>
		</div>
	);
}

export default User;
