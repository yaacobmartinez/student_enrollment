import { useState, useContext } from "react";
import { isEmail } from "validator";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "axios";
export const useLoginForm = (initialState) => {
	const [, setToken] = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState(initialState);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const initialError = {
		email: false,
		email_error: "Email is required.",
		password: false,
		password_error: "Password is required",
	};
	const [errors, setErrors] = useState(initialError);
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({ ...errors, email: false, password: false });
		if (!values.email) {
			return setErrors({ ...errors, email: true });
		}
		if (!values.password) {
			return setErrors({ ...errors, password: true });
		}
		if (!isEmail(values.email)) {
			return setErrors({
				...errors,
				email: true,
				email_error: "Please enter a valid email.",
			});
		}
		setErrors(initialError);
		setLoading(true);
		const auth = async () => {
			await Axios({
				method: "POST",
				url: "/users/login",
				data: values,
				validateStatus: (status) => {
					return true;
				},
			}).then((res) => {
				if (!res.data.success) {
					setLoading(false);
					return setErrors({
						...errors,
						[res.data.field]: true,
						[res.data.field + `_error`]: res.data.message,
					});
				}
				setToken(res.data.token);

				window.location.assign("/app");
			});
		};
		auth();
	};

	return [values, handleChange, handleSubmit, errors, loading];
};

export const useUpdateUser = (initialState, toggler, handleMessage) => {
	const [currentUser, setCurrentUser] = useState(initialState);
	const initialError = {
		first_name: false,
		last_name: false,
		email: false,
		role: false,
		first_name_error: "",
		last_name_error: "",
		email_error: "",
		role_error: "",
	};
	const [errors, setErrors] = useState(initialError);
	const handleChange = (e) => {
		setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
	};
	const handleCheck = (e) => {
		setCurrentUser({ ...currentUser, [e.target.name]: e.target.checked });
	};
	const [loading, setLoading] = useState(false);
	const handleSubmit = () => {
		setErrors(initialError);
		if (!currentUser.first_name) {
			return setErrors({
				...errors,
				first_name: true,
				first_name_error: "First Name is required.",
			});
		}
		if (!currentUser.last_name) {
			return setErrors({
				...errors,
				last_name: true,
				last_name_error: "Last Name is required.",
			});
		}
		if (!currentUser.email) {
			return setErrors({
				...errors,
				email: true,
				email_error: "Email is required.",
			});
		}
		if (!currentUser.role) {
			return setErrors({
				...errors,
				role: true,
				role_error: "Role is required.",
			});
		}
		if (!isEmail(currentUser.email)) {
			return setErrors({
				...errors,
				email: true,
				email_error: "Please enter a valid email.",
			});
		}
		if (currentUser._id) {
			try {
				setLoading(true);
				const updateUser = async () => {
					const access_token = localStorage.getItem("jwt");
					await Axios.patch(`/users/${currentUser._id}`, currentUser, {
						headers: { access_token },
					}).then((res) => {
						if (res.data.success) {
							toggler();
							setLoading(false);
							return window.location.assign("/users");
						}
						setLoading(false);
						handleMessage(true, `You don't have permission to do that.`);
					});
				};
				updateUser();
			} catch (error) {
				console.log(error.message);
			}
			return;
		}
		try {
			setLoading(true);
			const addUser = async () => {
				const access_token = localStorage.getItem("jwt");
				await Axios.post("/users/register", currentUser, {
					headers: { access_token },
				}).then((res) => {
					if (res.data.success) {
						toggler();
						setLoading(false);
						return console.log(res.data);
						// return window.location.assign("/users");
					}
					if (res.data.field !== "access") {
						setLoading(false);
						return setErrors({
							...errors,
							email: true,
							email_error: res.data.message,
						});
					}
					setLoading(false);
					handleMessage(true, `You don't have permission to do that.`);
				});
			};
			addUser();
		} catch (error) {
			console.log(error.message);
		}
	};
	return [
		currentUser,
		handleChange,
		handleCheck,
		handleSubmit,
		errors,
		loading,
	];
};

export const useRegistrationForm = (
	initialState,
	setLoading,
	setActiveStep
) => {
	const [values, setValues] = useState(initialState);
	const initialError = {
		first_name: false,
		last_name: false,
		middle_name: false,
		sex: false,
		date_of_birth: false,
		first_name_error: "",
		last_name_error: "",
		middle_name_error: "",
		sex_error: "",
		date_of_birth_error: "",
	};
	const [errors, setErrors] = useState(initialError);

	const handleChange = (e) => {
		setErrors(initialError);
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const setNext = () => {
		setErrors(initialError);
		if (!values.first_name) {
			return setErrors({
				...errors,
				first_name: true,
				first_name_error: `First Name is Required`,
			});
		}
		if (!values.middle_name) {
			return setErrors({
				...errors,
				middle_name: true,
				middle_name_error: `Middle Name is Required`,
			});
		}
		if (!values.last_name) {
			return setErrors({
				...errors,
				last_name: true,
				last_name_error: `Last Name is Required`,
			});
		}
		if (!values.sex) {
			return setErrors({
				...errors,
				sex: true,
				sex_error: `Sex is Required`,
			});
		}
		if (!values.date_of_birth) {
			return setErrors({
				...errors,
				date_of_birth: true,
				date_of_birth_error: `Date of Birth is Required`,
			});
		}
		setActiveStep((prevStep) => prevStep + 1);
	};
	const setPrevious = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};
	const handleSubmit = () => {
		setLoading(true);
		const addStudent = async () => {
			await Axios.post("/students", values)
				.then((res) => {
					if (res.data.success) {
						setLoading(false);
						return window.location.assign("/registration/success");
					}
					setLoading(false);
					console.log(res.data);
				})
				.catch((err) => console.log(err.message));
		};
		addStudent();
	};

	return [values, handleChange, handleSubmit, errors, setNext, setPrevious];
};
