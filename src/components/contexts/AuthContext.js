import React, { useEffect, useState, createContext } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { SWRConfig } from "swr";
export const AuthContext = createContext();
export const DrawerContext = createContext();
export const AuthContextProvider = (props) => {
	const checkToken = () => localStorage.getItem("jwt") || "";
	const [token, setToken] = useState(checkToken);
	useEffect(() => {
		localStorage.setItem("jwt", token);
	}, [token]);
	const currentUser = () => localStorage.getItem("currentUser");
	const [user] = useState(currentUser);
	useEffect(() => {
		const decoded = jwt.decode(token, { complete: true });
		if (decoded) {
			localStorage.setItem("currentUser", decoded.payload.id);
		}
	});
	const [drawerState, setDrawerState] = useState(false);
	const toggler = () => {
		setDrawerState(!drawerState);
	};
	const options = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return (
		<AuthContext.Provider value={[token, setToken, user]}>
			<DrawerContext.Provider value={[drawerState, toggler]}>
				<SWRConfig
					value={{
						dedupingInterval: 10000,
						fetcher: (url) => axios(url, options).then((r) => r.data),
					}}>
					{props.children}
				</SWRConfig>
			</DrawerContext.Provider>
		</AuthContext.Provider>
	);
};
