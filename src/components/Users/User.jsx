import React, { useState, useEffect } from "react";
import {
	Typography,
	makeStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,
	Button,
	Avatar,
} from "@material-ui/core";
import { ExpandMore, Person } from "@material-ui/icons";
import Axios from "axios";
import UserDetails from "./UserDetails";
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
	username: {
		fontSize: 15,
		fontWeight: 600,
	},
	panelDetails: {
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
}));
function User({ user }) {
	const classes = useStyles();
	const [role, setRole] = useState("");
	useEffect(() => {
		let isCancelled = false;
		const jwt = localStorage.getItem("jwt");
		const getRole = async () => {
			if (!isCancelled) {
				const r = await Axios.get(`/roles/${user.role}`, {
					headers: { access_token: jwt },
				});
				if (r.status === 200) {
					setRole(r.data.name);
				}
			}
		};
		getRole();
		return () => {
			isCancelled = true;
		};
	}, [user.role]);
	const [drawerState, setDrawerState] = useState(false);
	const toggler = () => {
		setDrawerState(!drawerState);
	};
	return (
		<>
			<ExpansionPanel className={classes.userCard} elevation={0}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMore />}
					className={classes.individualCard}>
					<Avatar style={{ backgroundColor: "#fff", marginRight: 10 }}>
						<Person fontSize='small' style={{ color: "#446FF3" }} />
					</Avatar>
					<div className={classes.column}>
						<Typography className={classes.username}>
							{user.first_name} {user.last_name}
						</Typography>
						<Typography variant='caption' color='textSecondary'>
							{user.email}
						</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.column}>
						<Typography className={classes.username}>Role</Typography>
						<Typography variant='caption' color='textSecondary'>
							{role}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.username}>Confirmed</Typography>
						<Typography variant='caption' color='textSecondary'>
							{user.confirmed.toString()}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.username}>Blocked</Typography>
						<Typography variant='caption' color='textSecondary'>
							{user.blocked.toString()}
						</Typography>
					</div>
				</ExpansionPanelDetails>
				<ExpansionPanelActions>
					<Button
						href={`/users/${user._id}`}
						style={{ textTransform: "none" }}
						color='inherit'>
						View More
					</Button>
					<div style={{ flex: 1 }} />
					<Button
						variant='outlined'
						onClick={toggler}
						color='primary'
						style={{ textTransform: "none" }}>
						Update User Details
					</Button>
				</ExpansionPanelActions>
			</ExpansionPanel>
			<UserDetails state={drawerState} toggler={toggler} user={user} />
		</>
	);
}

export default User;
