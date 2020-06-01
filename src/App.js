import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ProtectedRoute } from "./components/sections/ProtectedRoute";
import Home from "./components/Home/Home";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import axios from "axios";
import YouLostBro from "./components/sections/YouLostBro";
import Registration from "./components/Login/Registration";
import Users from "./components/Users/Users";
import Roles from "./components/Roles/Roles";
axios.defaults.baseURL = process.env.REACT_APP_DEFAULT_API_URL;
const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"Poppins",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

function App() {
	return (
		<div>
			<Router>
				<ThemeProvider theme={theme}>
					<AuthContextProvider>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route exact path='/register-student' component={Registration} />
							<ProtectedRoute exact path='/app' component={Home} />
							<ProtectedRoute exact path='/users' component={Users} />
							<ProtectedRoute exact path='/roles' component={Roles} />
							<Route path='*' component={YouLostBro} />
						</Switch>
					</AuthContextProvider>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
