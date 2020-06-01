import React, { useState } from "react";
import {
	Grid,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	FormControlLabel,
	Switch,
	IconButton,
	Button,
	Popover,
	Typography,
	makeStyles,
	FormHelperText,
} from "@material-ui/core";
import { HelpOutlineOutlined } from "@material-ui/icons";
import { BootstrapInput } from "../customStyledComponents/Inputs";
const useStyles = makeStyles((theme) => ({
	bottomBtns: {
		position: "absolute",
		bottom: 10,
		width: "90%",
	},
	btn: {
		marginTop: theme.spacing(1),
		textTransform: "none",
	},
	popover: {
		pointerEvents: "none",
	},
	paper: {
		padding: theme.spacing(1),
	},
}));

function UserForm(props) {
	const classes = useStyles();
	const {
		currentUser,
		handleChange,
		handleCheck,
		handleSubmit,
		errors,
		roles,
		toggler,
		loading,
	} = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [popover, setPopover] = useState(null);
	const handlePopoverOpen = (event) => {
		setPopover(event.target.name);
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	return (
		<div>
			<Grid container spacing={3} style={{ marginTop: 5 }}>
				<Grid item xs>
					<InputLabel shrink htmlFor='first_name'>
						First Name
					</InputLabel>
					<BootstrapInput
						error={errors.first_name}
						autoFocus
						fullWidth
						id='first_name'
						name='first_name'
						value={currentUser.first_name}
						onChange={handleChange}
					/>
					{errors.first_name && (
						<FormHelperText style={{ color: "red" }}>
							{errors.first_name_error}
						</FormHelperText>
					)}
				</Grid>

				<Grid item xs>
					<InputLabel shrink htmlFor='last_name'>
						Last Name
					</InputLabel>
					<BootstrapInput
						error={errors.last_name}
						fullWidth
						id='last_name'
						name='last_name'
						value={currentUser.last_name}
						onChange={handleChange}
					/>
					{errors.last_name && (
						<FormHelperText style={{ color: "red" }}>
							{errors.last_name_error}
						</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12}>
					<InputLabel shrink htmlFor='email'>
						Email
					</InputLabel>
					<BootstrapInput
						error={errors.email}
						fullWidth
						id='email'
						name='email'
						value={currentUser.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<FormHelperText style={{ color: "red" }}>
							{errors.email_error}
						</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth style={{ marginTop: 10 }}>
						<InputLabel shrink htmlFor='role' style={{ marginTop: -10 }}>
							Role
						</InputLabel>
						<Select
							error={errors.role}
							id='role'
							input={<BootstrapInput />}
							name='role'
							value={currentUser.role}
							onChange={handleChange}>
							<MenuItem disabled value=''>
								Choose Role
							</MenuItem>
							{roles &&
								roles.map((role) => (
									<MenuItem key={role._id} value={role._id}>
										{role.name}
									</MenuItem>
								))}
						</Select>
						{errors.role && (
							<FormHelperText style={{ color: "red" }}>
								{errors.role_error}
							</FormHelperText>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} style={{ display: "flex" }}>
					<FormControlLabel
						control={
							<Switch
								name='confirmed'
								onChange={handleCheck}
								checked={currentUser.confirmed}
							/>
						}
						label='Confirmed'
					/>
					<div style={{ flex: 1 }} />
					<IconButton
						size='small'
						name='Confirmed means user has confirmed email address'
						onMouseEnter={handlePopoverOpen}
						onMouseLeave={handlePopoverClose}>
						<HelpOutlineOutlined fontSize='small' />
					</IconButton>
				</Grid>
				<Grid item xs={12} style={{ display: "flex" }}>
					<FormControlLabel
						control={
							<Switch
								name='blocked'
								onChange={handleCheck}
								checked={currentUser.blocked}
							/>
						}
						label='Blocked'
					/>
					<div style={{ flex: 1 }} />
					<IconButton
						size='small'
						name='Blocked means user has no access to the system'
						onMouseEnter={handlePopoverOpen}
						onMouseLeave={handlePopoverClose}>
						<HelpOutlineOutlined fontSize='small' />
					</IconButton>
				</Grid>
				<Grid item xs className={classes.bottomBtns}>
					<Button
						fullWidth
						disabled={loading}
						onClick={handleSubmit}
						className={classes.btn}
						variant='contained'
						color='primary'>
						{loading ? `Saving ... ` : `Save`}
					</Button>
					<Button fullWidth onClick={toggler} className={classes.btn}>
						Cancel
					</Button>
				</Grid>
			</Grid>
			<Popover
				className={classes.popover}
				classes={{
					paper: classes.paper,
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus>
				<Typography variant='caption'>{popover}</Typography>
			</Popover>
		</div>
	);
}

export default UserForm;
