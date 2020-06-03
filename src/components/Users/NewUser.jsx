import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useUpdateUser } from "../utils/useForm";
import { Drawer, makeStyles, Snackbar, IconButton } from "@material-ui/core";
import { AccountCircle, Close } from "@material-ui/icons";
import { ListItemTitle } from "../customStyledComponents/Text";
import UserForm from "./UserForm";
const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 500,
		[theme.breakpoints.down("xs")]: {
			width: "100vw",
		},
	},
	drawerContent: {
		padding: theme.spacing(0, 5),
	},
}));
function NewUser({ state, toggler }) {
	const classes = useStyles();
	const [roles, setRoles] = useState([]);
	useEffect(() => {
		let isCancelled = false;
		const jwt = localStorage.getItem("jwt");
		const fetchRoles = async () => {
			if (!isCancelled) {
				const r = await Axios.get(`/roles`, {
					headers: { access_token: jwt },
				});
				if (r.status === 200) {
					setRoles(r.data);
				}
			}
		};
		fetchRoles();
		return () => {
			isCancelled = true;
		};
	}, []);
	const [message, setMessage] = useState({
		state: false,
		message: "",
	});
	const handleMessage = (state, message) => {
		setMessage({ state, message });
	};
	const handleClose = () => {
		setMessage({ ...message, state: false });
	};
	const initialUser = {
		first_name: "",
		last_name: "",
		email: "",
		role: "",
		password: process.env.REACT_APP_DEFAULT_PASSWORD,
		confirmed: false,
		blocked: false,
	};
	const [
		currentUser,
		handleChange,
		handleCheck,
		handleSubmit,
		errors,
		loading,
	] = useUpdateUser(initialUser, toggler, handleMessage);
	const passProps = {
		currentUser,
		handleChange,
		handleCheck,
		handleSubmit,
		errors,
		roles,
		toggler,
		loading,
	};
	return (
		<div>
			<Snackbar
				open={message.state}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				autoHideDuration={6000}
				onClose={handleClose}
				message={message.message}
				action={
					<IconButton size='small' color='inherit' onClick={handleClose}>
						<Close fontSize='small' />
					</IconButton>
				}
			/>
			<Drawer
				anchor='right'
				open={state}
				onClose={toggler}
				ModalProps={{ disableBackdropClick: true }}>
				<div className={classes.drawer}>
					<div className={classes.drawerContent}>
						<ListItemTitle
							title='User Information'
							caption='Add information for the user you want to create'
							icon={<AccountCircle fontSize='large' />}
						/>
						<UserForm {...passProps} />
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default NewUser;
