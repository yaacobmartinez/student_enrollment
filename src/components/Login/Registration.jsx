import React, { useState } from "react";
import CustomAppBar from "../sections/AppBar";
import {
	Container,
	Typography,
	Grid,
	CircularProgress,
	makeStyles,
	Button,
	Slide,
	MobileStepper,
	AppBar,
	Toolbar,
	Backdrop,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import { PageHeroTitle } from "../customStyledComponents/Text";
import { BootstrapInput } from "../customStyledComponents/Inputs";
import { useRegistrationForm } from "../utils/useForm";
import Summary from "./Summary";
const useStyles = makeStyles((theme) => ({
	main: {
		padding: theme.spacing(4),
		width: "100%",
	},
	stepper: {
		width: "100%",
		padding: theme.spacing(2, 2),
		borderRadius: 10,
		backgroundColor: theme.palette.grey[200],
		display: "flex",
		flexDirection: "row",
		alignItems: "baseline",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	stepStatus: {
		textAlign: "right",
		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
		},
	},
	appbar: {
		minHeight: 128,
		alignContent: "",
		flexDirection: "column-reverse",
		zIndex: theme.zIndex.appBar - 1,
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
	backdrop: {
		zIndex: theme.zIndex.appBar + 2,
	},
	form: {
		marginTop: theme.spacing(4),
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(2),
		},
	},
}));

const steps = [
	{ id: 1, title: "Student Information", caption: "Your Basic Information" },
	{
		id: 2,
		title: "Parent Information",
		caption: "Your Parent/Guardian Information",
	},
	{
		id: 3,
		title: "School Information",
		caption: "Grade/Year Level and Details",
	},
	{
		id: 4,
		title: "Review and Finish",
		caption: "Please review all information before clicking on Finish ",
	},
];
const initialStudent = {
	first_name: "",
	last_name: "",
	middle_name: "",
	extension_name: "",
	sex: "",
	date_of_birth: "",
	houseNumberAndStreet: "",
	cityMunicipalityProvinceCountry: "",
	father_first_name: "",
	father_middle_name: "",
	father_last_name: "",
	mother_first_name: "",
	mother_middle_name: "",
	mother_last_name: "",
	guardian_first_name: "",
	guardian_middle_name: "",
	guardian_last_name: "",
	contact: "",
	student_type: "",
	gradeLevel: "",
	section: "",
	track: "",
	strand: "",
	semester: "",
};
const tracks = ["Academic", "TVL", "Sports", "Arts and Design"];
const strands = ["GAS", "HUMSS", "STEM", "ABM", "Home Economics", "ICT"];
function Registration() {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [
		values,
		handleChange,
		handleSubmit,
		errors,
		setNext,
		setPrevious,
	] = useRegistrationForm(initialStudent, setLoading, setActiveStep);
	const maxSteps = steps.length;

	return (
		<div>
			<Backdrop open={loading} className={classes.backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<CustomAppBar />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					{/* AppBar */}
					<AppBar className={classes.appbar} elevation={1}>
						<Toolbar>
							<div>
								<Typography>
									Step {activeStep + 1} of {maxSteps}
								</Typography>
								<Typography variant='caption'>
									{steps[activeStep].title}
								</Typography>
							</div>
							<div style={{ flex: 1 }} />
							<Typography variant='caption'>
								{activeStep !== maxSteps - 1
									? `Next: ${steps[activeStep + 1].title}`
									: null}
							</Typography>
						</Toolbar>
					</AppBar>

					<div>
						<PageHeroTitle
							title={steps[activeStep].title}
							caption={steps[activeStep].caption}
						/>
					</div>

					<Grid container className={classes.form} spacing={2}>
						{activeStep === 0 ? (
							<>
								<Grid item xs={12} sm={3}>
									<InputLabel shrink>First Name</InputLabel>
									<BootstrapInput
										error={errors.first_name}
										fullWidth
										autoFocus
										name='first_name'
										value={values.first_name}
										onChange={handleChange}
									/>
									{errors.first_name && (
										<FormHelperText style={{ color: "red" }}>
											{errors.first_name_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12} sm={3}>
									<InputLabel shrink>Middle Name</InputLabel>
									<BootstrapInput
										fullWidth
										error={errors.middle_name}
										name='middle_name'
										value={values.middle_name}
										onChange={handleChange}
									/>
									{errors.middle_name && (
										<FormHelperText style={{ color: "red" }}>
											{errors.middle_name_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={9} sm={3}>
									<InputLabel shrink>Last Name</InputLabel>
									<BootstrapInput
										fullWidth
										error={errors.last_name}
										name='last_name'
										value={values.last_name}
										onChange={handleChange}
									/>
									{errors.last_name && (
										<FormHelperText style={{ color: "red" }}>
											{errors.last_name_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={3}>
									<InputLabel shrink>Extension</InputLabel>
									<BootstrapInput
										fullWidth
										placeholder='ex. Jr, III, Sr.'
										name='extension_name'
										value={values.extension_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl fullWidth>
										<InputLabel shrink>Sex</InputLabel>
										<Select
											error={errors.sex}
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='sex'
											value={values.sex}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Sex
											</MenuItem>
											<MenuItem value='male'>Male</MenuItem>
											<MenuItem value='female'>Female</MenuItem>
										</Select>
										{errors.sex && (
											<FormHelperText style={{ color: "red" }}>
												{errors.sex_error}
											</FormHelperText>
										)}
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputLabel shrink>Date of Birth</InputLabel>
									<BootstrapInput
										fullWidth
										style={{ marginTop: 4 }}
										error={errors.date_of_birth}
										type='date'
										name='date_of_birth'
										value={values.date_of_birth}
										onChange={handleChange}
									/>
									{errors.date_of_birth && (
										<FormHelperText style={{ color: "red" }}>
											{errors.date_of_birth_error}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>House Address</InputLabel>
									<BootstrapInput
										fullWidth
										name='houseNumberAndStreet'
										value={values.houseNumberAndStreet}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>City/Municipality/Province</InputLabel>
									<BootstrapInput
										fullWidth
										name='cityMunicipalityProvinceCountry'
										value={values.cityMunicipalityProvinceCountry}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Contact</InputLabel>
									<BootstrapInput
										fullWidth
										name='contact'
										value={values.contact}
										onChange={handleChange}
									/>
								</Grid>
							</>
						) : null}
						{activeStep === 1 ? (
							<>
								<Grid item xs={12} style={{ padding: 0 }}>
									<Typography variant='body2'>Father</Typography>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>First Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='father_first_name'
										value={values.father_first_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Middle Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='father_middle_name'
										value={values.father_middle_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Last Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='father_last_name'
										value={values.father_last_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} style={{ padding: 0 }}>
									<Typography variant='body2'>Mother</Typography>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>First Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='mother_first_name'
										value={values.mother_first_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Middle Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='mother_middle_name'
										value={values.mother_middle_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Last Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='mother_last_name'
										value={values.mother_last_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} style={{ padding: 0 }}>
									<Typography variant='body2'>Guardian</Typography>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>First Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='guardian_first_name'
										value={values.guardian_first_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Middle Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='guardian_middle_name'
										value={values.guardian_middle_name}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Last Name</InputLabel>
									<BootstrapInput
										fullWidth
										name='guardian_last_name'
										value={values.guardian_last_name}
										onChange={handleChange}
									/>
								</Grid>
							</>
						) : null}
						{activeStep === 2 ? (
							<>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<InputLabel shrink>Student Type</InputLabel>
										<Select
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='student_type'
											value={values.student_type}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Type
											</MenuItem>
											<MenuItem value='old'>Old</MenuItem>
											<MenuItem value='new'>New</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<InputLabel shrink>Grade Level</InputLabel>
										<Select
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='gradeLevel'
											value={values.gradeLevel}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Level
											</MenuItem>
											{Array.from({ length: 12 }, (v, i) => i + 1).map(
												(grade) => (
													<MenuItem key={grade} value={grade}>
														{grade}
													</MenuItem>
												)
											)}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<InputLabel shrink>Section</InputLabel>
									<BootstrapInput
										fullWidth
										name='section'
										style={{ marginTop: 4 }}
										value={values.section}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<InputLabel shrink>Track (for grades 11/12)</InputLabel>
										<Select
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='track'
											value={values.track}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Track
											</MenuItem>
											{tracks.map((track) => (
												<MenuItem key={track} value={track}>
													{track}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<InputLabel shrink>Strand (for grades 11/12)</InputLabel>
										<Select
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='strand'
											value={values.strand}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Strand
											</MenuItem>
											{strands.map((strand) => (
												<MenuItem key={strand} value={strand}>
													{strand}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<InputLabel shrink>Semester (for grades 11/12)</InputLabel>
										<Select
											style={{ marginTop: 20 }}
											input={<BootstrapInput />}
											name='semester'
											value={values.semester}
											onChange={handleChange}>
											<MenuItem disabled value=''>
												Choose Semester
											</MenuItem>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</>
						) : null}
						{activeStep === 3 ? (
							<>
								<Summary values={values} />
							</>
						) : null}
					</Grid>

					{/* Stepper */}
					<MobileStepper
						steps={maxSteps}
						position='bottom'
						variant='progress'
						activeStep={activeStep}
						backButton={
							<Button
								size='small'
								onClick={setPrevious}
								disabled={activeStep === 0}>
								<ChevronLeft />
								Back
							</Button>
						}
						nextButton={
							<Button
								size='small'
								variant={activeStep === maxSteps - 1 ? "contained" : null}
								onClick={activeStep === maxSteps - 1 ? handleSubmit : setNext}
								color={activeStep === maxSteps - 1 ? "primary" : "default"}>
								{activeStep === maxSteps - 1 ? "Finish" : "Next"}
								<ChevronRight />
							</Button>
						}
					/>
				</Container>
			</Slide>
		</div>
	);
}
export default Registration;
