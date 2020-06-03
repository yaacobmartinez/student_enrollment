import React, { useState } from "react";
import {
	makeStyles,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Switch,
	Snackbar,
	IconButton,
} from "@material-ui/core";
import Axios from "axios";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	listItem: {
		margin: theme.spacing(1, 0),
	},
	avatar: {
		backgroundColor: "aliceblue",
	},
}));
const PermissionItem = ({ permission, displayTitle, icon }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const [userPermission, setUserPermission] = useState(permission);
	const handleChange = (e) => {
		setUserPermission({ ...userPermission, enabled: e.target.checked });
		const access_token = localStorage.getItem("jwt");
		if (userPermission._id) {
			const updatePermission = async () => {
				const updateStatus = await Axios.patch(
					`/permissions/${userPermission._id}`,
					{ enabled: e.target.checked },
					{ headers: { access_token } }
				);
				if (!updateStatus.data.success) {
					setOpen(true);
					return setUserPermission({ ...userPermission, enabled: false });
				}
				console.log(updateStatus.data.message);
			};

			return updatePermission();
		}
	};

	return (
		<div>
			<ListItem className={classes.listItem}>
				<ListItemAvatar>
					<Avatar className={classes.avatar}>{icon}</Avatar>
				</ListItemAvatar>
				<ListItemText primary={`${displayTitle}`} />
				<ListItemSecondaryAction>
					<Switch
						color='primary'
						edge='end'
						checked={userPermission.enabled}
						onChange={handleChange}
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<Snackbar
				open={open}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				autoHideDuration={6000}
				onClose={handleClose}
				message="You don't have permission to do that."
				action={
					<IconButton size='small' color='inherit' onClick={handleClose}>
						<Close fontSize='small' />
					</IconButton>
				}
			/>
		</div>
	);
};

export default PermissionItem;
