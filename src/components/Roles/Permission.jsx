import React from "react";
import { makeStyles, Drawer, List, Button } from "@material-ui/core";
import { BubbleChart, Visibility, Add, Edit, Delete } from "@material-ui/icons";
import PermissionItem from "./PermissionItem";
import { ListItemTitle } from "../customStyledComponents/Text";

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
const Permission = ({ state, toggler, role, controller, permissions }) => {
	const classes = useStyles();
	const con = controller.toLowerCase();
	const userPermissions = permissions.filter(
		(p) => p.role === role && p.controller === con
	);
	return (
		<Drawer
			anchor='right'
			open={state}
			onClose={toggler}
			ModalProps={{ disableBackdropClick: true }}>
			<div className={classes.drawer}>
				<div className={classes.drawerContent}>
					<ListItemTitle
						title={controller}
						caption={`Permission for the ${controller} Object`}
						icon={<BubbleChart fontSize='small' />}
					/>
					<List>
						{userPermissions.length > 0 ? (
							userPermissions
								.filter((p) => p.action === "find")
								.map((permission) => (
									<PermissionItem
										key={permission._id}
										permission={permission}
										displayTitle={`View ${controller}`}
										icon={<Visibility color='primary' />}
									/>
								))
						) : (
							<PermissionItem
								icon={<Visibility color='primary' />}
								displayTitle={`View ${controller}`}
								permission={{
									action: "find",
									role,
									controller,
									enabled: false,
								}}
							/>
						)}
						{userPermissions.length > 0 ? (
							userPermissions
								.filter((p) => p.action === "create")
								.map((permission) => (
									<PermissionItem
										key={permission._id}
										permission={permission}
										displayTitle={`Create ${controller}`}
										icon={<Add color='primary' />}
									/>
								))
						) : (
							<PermissionItem
								icon={<Add color='primary' />}
								displayTitle={`Create ${controller}`}
								permission={{
									action: "create",
									role,
									controller,
									enabled: false,
								}}
							/>
						)}
						{userPermissions.length > 0 ? (
							userPermissions
								.filter((p) => p.action === "update")
								.map((permission) => (
									<PermissionItem
										key={permission._id}
										permission={permission}
										displayTitle={`Modify ${controller}`}
										icon={<Edit color='primary' />}
									/>
								))
						) : (
							<PermissionItem
								icon={<Edit color='primary' />}
								displayTitle={`Modify ${controller}`}
								permission={{
									action: "update",
									role,
									controller,
									enabled: false,
								}}
							/>
						)}
						{userPermissions.length > 0 ? (
							userPermissions
								.filter((p) => p.action === "delete")
								.map((permission) => (
									<PermissionItem
										key={permission._id}
										permission={permission}
										displayTitle={`Remove ${controller}`}
										icon={<Delete color='primary' />}
									/>
								))
						) : (
							<PermissionItem
								icon={<Delete color='primary' />}
								displayTitle={`Remove ${controller}`}
								permission={{
									action: "delete",
									role,
									controller: controller.toLowerCase(),
									enabled: false,
								}}
							/>
						)}
					</List>
					<div style={{ display: "flex" }}>
						<Button
							fullWidth
							onClick={toggler}
							style={{ textTransform: "none" }}>
							Cancel
						</Button>
						<Button
							fullWidth
							onClick={() => {
								window.location.reload();
							}}
							style={{ textTransform: "none" }}
							color='primary'
							variant='outlined'>
							Save
						</Button>
					</div>
				</div>
			</div>
		</Drawer>
	);
};

export default Permission;
