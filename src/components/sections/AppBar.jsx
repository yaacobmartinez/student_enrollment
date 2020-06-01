import React, { useContext, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Drawer,
	Grid,
	makeStyles,
	TextField,
	Link,
	InputBase,
} from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, Search, ArrowBack } from "@material-ui/icons";
import { useLoginForm } from "../utils/useForm";

const useStyles = makeStyles((theme) => ({
	drawer: { width: 500, padding: theme.spacing(8, 4) },
	searchIcon: { color: theme.palette.background.default },
	mobileSearchBar: {
		padding: theme.spacing(1),
		display: "flex",
		flexDirection: "row",
	},
}));

function CustomAppBar({ toggler }) {
	const classes = useStyles();
	const [token] = useContext(AuthContext);
	const [drawer, setDrawer] = useState(false);
	const toggleDrawer = () => {
		setDrawer(!drawer);
	};
	const handleLogout = () => {
		localStorage.clear();
		window.location.assign("/");
	};
	const [mobileSearch, setMobileSearch] = useState(false);
	const toggleMobileSearch = () => {
		setMobileSearch(!mobileSearch);
	};
	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					{token && (
						<IconButton onClick={toggler} edge='start' color='inherit'>
							<Menu />
						</IconButton>
					)}
					<Typography style={{ flex: 1 }}>
						{process.env.REACT_APP_DEFAULT_APP_NAME}
					</Typography>
					{token ? (
						<>
							<MobileSearchBar
								state={mobileSearch}
								toggler={toggleMobileSearch}
							/>
							<IconButton
								className={classes.searchIcon}
								onClick={toggleMobileSearch}>
								<Search />
							</IconButton>
							<Button
								color='inherit'
								style={{ textTransform: "none" }}
								onClick={handleLogout}>
								Sign Out
							</Button>
						</>
					) : (
						<Button
							color='inherit'
							style={{ textTransform: "none" }}
							onClick={toggleDrawer}>
							Sign In
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<DrawerLogin state={drawer} toggler={toggleDrawer} />
		</div>
	);
}

const MobileSearchBar = ({ state, toggler }) => {
	const classes = useStyles();
	const [key, setKey] = useState("");
	const handleChange = (e) => {
		setKey(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (key) {
			window.location.assign(`/search/${key}`);
		}
		toggler();
		setKey("");
	};
	const handleClose = () => {
		setKey("");
		toggler();
	};
	return (
		<Drawer
			anchor='top'
			open={state}
			onClose={toggler}
			ModalProps={{ hideBackdrop: true }}>
			<form className={classes.mobileSearchBar} onSubmit={handleSubmit}>
				<IconButton onClick={handleClose}>
					<ArrowBack />
				</IconButton>
				<InputBase
					autoFocus
					name='search'
					value={key}
					onChange={handleChange}
					placeholder='Search'
					style={{ flex: 1 }}
				/>
				<IconButton onClick={handleSubmit}>
					<Search />
				</IconButton>
			</form>
		</Drawer>
	);
};
const DrawerLogin = ({ state, toggler }) => {
	const classes = useStyles();
	const initialState = { email: "", password: "" };
	const [values, handleChange, handleSubmit, errors, loading] = useLoginForm(
		initialState
	);
	return (
		<div>
			<Drawer anchor='right' open={state} onClose={toggler}>
				<div className={classes.drawer}>
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'
						component='form'
						onSubmit={handleSubmit}
						spacing={2}>
						<Grid item xs>
							<Typography variant='h6'>Sign in to your Account</Typography>
						</Grid>
						<Grid item xs style={{ width: "100%" }}>
							<TextField
								autoFocus
								fullWidth
								label='Email'
								variant='outlined'
								name='email'
								values={values.email}
								onChange={handleChange}
								error={errors.email}
								helperText={errors.email ? errors.email_error : null}
							/>
						</Grid>
						<Grid item xs style={{ width: "100%" }}>
							<TextField
								fullWidth
								label='Password'
								variant='outlined'
								type='password'
								name='password'
								values={values.password}
								onChange={handleChange}
								error={errors.password}
								helperText={errors.password ? errors.password_error : null}
							/>
						</Grid>
						<Grid item xs style={{ width: "100%" }}>
							<Button
								fullWidth
								variant='contained'
								color='primary'
								size='large'
								disabled={loading}
								style={{ textTransform: "none" }}
								onClick={handleSubmit}>
								{loading ? `Please wait...` : `Sign In`}
							</Button>
						</Grid>
						<Grid item xs style={{ width: "100%" }}>
							<Typography variant='subtitle2'>
								Don't have an account?
							</Typography>
							<Link href='#'>
								<Typography variant='subtitle2'>
									Request access from your School Administrator
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</div>
			</Drawer>
		</div>
	);
};

export default CustomAppBar;
