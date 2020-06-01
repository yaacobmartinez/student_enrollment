import React, { useContext } from "react";
import AppBar from "../sections/AppBar";
import { AuthContext } from "../contexts/AuthContext";
import Welcome from "../sections/Welcome";

function Login() {
	const [token] = useContext(AuthContext);
	if (token) {
		window.location.assign("/app");
	}
	const actions = [
		{ href: "/register-student", title: "Student Registration" },
	];
	return (
		<div>
			<AppBar />
			<Welcome actions={actions} />
		</div>
	);
}

export default Login;
