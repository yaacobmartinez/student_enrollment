import React from "react";
import {
	ExpansionPanel,
	makeStyles,
	ExpansionPanelSummary,
	Avatar,
	Typography,
	ExpansionPanelDetails,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Hidden,
} from "@material-ui/core";
import { ExpandMore, Group, Person, ErrorOutlined } from "@material-ui/icons";

import RolePermission from "./RolePermission";

const useStyles = makeStyles((theme) => ({
	userCard: {
		margin: theme.spacing(2, 0),
		backgroundColor: "aliceblue",
		"&.MuiExpansionPanel-root:before": {
			display: "none",
		},
	},
	column: {
		flexBasis: "33.33%",
	},
	halfcolumn: {
		flexBasis: "50%",
	},
	username: {
		fontSize: 15,
		fontWeight: 600,
	},
	users: {
		fontSize: 12,
		fontWeight: 600,
	},
	caption: {
		fontSize: 10,
		color: theme.palette.text.secondary,
	},
	caption2: {
		fontSize: 12,
		color: theme.palette.text.secondary,
	},
	panelDetails: {
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
	avatar: {
		backgroundColor: "#fff",
		marginRight: 10,
	},
	btn: {
		textTransform: "none",
	},
}));
function Role({ role, users, permissions }) {
	const roleUsers = users.filter((user) => user.role === role._id);
	const collections = ["Users", "Roles", "Students"];
	const classes = useStyles();
	return (
		<div>
			<ExpansionPanel className={classes.userCard} elevation={0}>
				<ExpansionPanelSummary expandIcon={<ExpandMore />}>
					<Avatar className={classes.avatar}>
						<Group fontSize='small' style={{ color: "#446FF3" }} />
					</Avatar>
					<div className={classes.column}>
						<Typography className={classes.username}>{role.name}</Typography>
						<Typography variant='caption' color='textSecondary'>
							{role.description}
						</Typography>
					</div>
				</ExpansionPanelSummary>
				<Divider
					style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
				/>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.halfcolumn}>
						<div>
							<Typography className={classes.username}>Users</Typography>
							<Typography variant='caption' color='textSecondary'>
								Users under this Role
							</Typography>
							<div>
								<List>
									{roleUsers.length > 0 ? (
										roleUsers.map((user) => (
											<ListItem
												button
												key={user._id}
												component='a'
												href={`/users/${user._id}`}>
												<ListItemIcon>
													<Person fontSize='small' />
												</ListItemIcon>
												<ListItemText
													primary={
														<Typography className={classes.users}>
															{user.first_name} {user.last_name}
														</Typography>
													}
													secondary={
														<Typography className={classes.caption}>
															{user.email}
														</Typography>
													}
												/>
											</ListItem>
										))
									) : (
										<ListItem>
											<ListItemIcon>
												<ErrorOutlined fontSize='small' />
											</ListItemIcon>
											<ListItemText
												primary={
													<Typography className={classes.users}>
														No Users
													</Typography>
												}
												secondary={
													<Typography className={classes.caption}>
														There are no users with this role
													</Typography>
												}
											/>
										</ListItem>
									)}
								</List>
								<Hidden smUp>
									<Divider style={{ marginBottom: 20 }} />
								</Hidden>
							</div>
						</div>
					</div>

					<div className={classes.halfcolumn}>
						<div>
							<Typography className={classes.username}>Permissions</Typography>
							<Typography variant='caption' color='textSecondary'>
								Allowed actions for this Role
							</Typography>
						</div>
						<div>
							<List>
								{collections.map((collection) => (
									<RolePermission
										key={collection}
										role={role._id}
										collection={collection}
										permissions={permissions}
									/>
								))}
							</List>
						</div>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default Role;
