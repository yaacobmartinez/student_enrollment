import React from "react";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	makeStyles,
	Avatar,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
	pageherotitle: {
		display: "flex",
		alignItems: "center",
		marginTop: theme.spacing(15),
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
}));
export const ListItemTitle = ({ title, caption, icon }) => {
	return (
		<List>
			<ListItem style={{ paddingLeft: 0 }}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText
					primary={title}
					secondary={
						<Typography variant='caption' color='textSecondary'>
							{caption}
						</Typography>
					}
				/>
			</ListItem>
		</List>
	);
};

export const PageHeroTitle = ({ title, caption, button }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.pageherotitle}>
				<div>
					<Typography variant='h5'>{title}</Typography>
					<Typography variant='body1' color='textSecondary'>
						{caption}
					</Typography>
				</div>
				<div style={{ flex: 1 }} />
				{button ? <div>{button}</div> : null}
			</div>
		</>
	);
};

export const CustomSkeleton = () => {
	return (
		<div style={{ padding: 30, display: "flex", alignItems: "center" }}>
			<Skeleton variant='circle'>
				<Avatar />
			</Skeleton>
			<div style={{ flex: 1 }}>
				<Skeleton
					height={10}
					width='20%'
					style={{ marginLeft: 10, marginBottom: 6 }}
				/>
				<Skeleton
					height={10}
					width='30%'
					style={{ marginLeft: 10, marginBottom: 6 }}
				/>
			</div>
		</div>
	);
};

export const CustomTitleSkeleton = () => {
	return (
		<div>
			<Skeleton
				height={30}
				width='30%'
				style={{ marginLeft: 10, marginBottom: 6 }}
			/>
			<Skeleton
				height={20}
				width='40%'
				style={{ marginLeft: 10, marginBottom: 6 }}
			/>
		</div>
	);
};
