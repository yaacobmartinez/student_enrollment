import React, { useState } from "react";
import {
	makeStyles,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Switch,
} from "@material-ui/core";
import Axios from "axios";

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
				console.log(updateStatus.data.message);
			};

			return updatePermission();
		}
	};
	return (
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
	);
};

export default PermissionItem;
