import React, { useState } from "react";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { BubbleChart } from "@material-ui/icons";
import Permission from "./Permission";
const useStyles = makeStyles((theme) => ({
	users: {
		fontSize: 12,
		fontWeight: 600,
	},
	caption: {
		fontSize: 10,
		color: theme.palette.text.secondary,
	},
}));
function RolePermission({ role, collection, permissions }) {
	const classes = useStyles();
	const [state, setState] = useState(false);
	const toggler = () => {
		setState(!state);
	};
	return (
		<>
			<ListItem button onClick={toggler}>
				<ListItemIcon>
					<BubbleChart fontSize='small' />
				</ListItemIcon>
				<ListItemText
					primary={
						<Typography className={classes.users}>{collection}</Typography>
					}
					secondary={
						<Typography className={classes.caption}>
							Permissions for the {collection} object
						</Typography>
					}
				/>
			</ListItem>
			<Permission
				state={state}
				toggler={toggler}
				role={role}
				controller={collection}
				permissions={permissions}
			/>
		</>
	);
}

export default RolePermission;
