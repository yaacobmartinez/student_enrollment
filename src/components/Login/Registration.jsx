import React, { useState } from "react";
import CustomAppBar from "../sections/AppBar";
import {
	Container,
	Typography,
	Grid,
	Box,
	CircularProgress,
	makeStyles,
	Button,
	Slide,
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import { Step1, Step2, Step3, Step4 } from "./RegistrationForms";
const useStyles = makeStyles((theme) => ({
	main: {
		padding: theme.spacing(4),
	},
	stepper: {
		width: "100%",
		padding: theme.spacing(2, 4),
		borderRadius: 10,
		backgroundColor: theme.palette.grey[200],
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	btns: {
		padding: theme.spacing(2),
	},
}));
function Registration() {
	const classes = useStyles();
	const [perc, setPerc] = useState(25);
	const [step, setStep] = useState(1);
	const [form, setForm] = useState(<Step1 />);
	const handleNext = () => {
		setStep(step + 1);
		setPerc(perc + 25);
		const nextStep = step + 1;
		if (nextStep === 2) {
			return setForm(<Step2 />);
		}
		if (nextStep === 3) {
			return setForm(<Step3 />);
		}
		if (nextStep === 4) {
			return setForm(<Step4 />);
		}
	};
	const handlePrevious = () => {
		setStep(step - 1);
		setPerc(perc - 25);
		const prevStep = step - 1;
		if (prevStep === 1) {
			return setForm(<Step1 />);
		}
		if (prevStep === 2) {
			return setForm(<Step2 />);
		}
		if (prevStep === 3) {
			return setForm(<Step3 />);
		}
	};
	return (
		<div>
			<CustomAppBar />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='sm' className={classes.main}>
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'>
						<Stepper perc={perc} step={step} />
						<Grid item xs>
							{form}
						</Grid>
						<Grid
							item
							xs
							className={classes.btns}
							container
							alignItems='center'
							justify='space-between'>
							{step === 1 ? null : (
								<Button onClick={handlePrevious} startIcon={<ChevronLeft />}>
									Back
								</Button>
							)}
							<div style={{ flex: 1 }} />
							{step === 4 ? null : (
								<Button onClick={handleNext} endIcon={<ChevronRight />}>
									Next
								</Button>
							)}
						</Grid>
					</Grid>
				</Container>
			</Slide>
		</div>
	);
}

const Stepper = ({ perc, step }) => {
	const classes = useStyles();
	const steps = [
		{ step: 1, title: "Student Information" },
		{ step: 2, title: "Address Information" },
		{ step: 3, title: "Guardian Information" },
		{ step: 4, title: "School Information" },
	];
	const currentStep = steps.filter((s) => s.step === step);
	const nextStep = steps.filter((s) => s.step === step + 1);
	const lastStep = steps[steps.length - 1];
	return (
		<div className={classes.stepper}>
			<Grid item xs>
				<Box position='relative' display='inline-flex'>
					<CircularProgress
						variant='static'
						thickness={5}
						size={80}
						value={perc}
						color='primary'
					/>
					<Box
						top={0}
						left={0}
						bottom={0}
						right={0}
						position='absolute'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Typography variant='h6'>{step} of 4</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item xs style={{ textAlign: "right" }}>
				<Typography variant='h6'>{currentStep[0].title}</Typography>
				{lastStep.step === currentStep[0].step ? (
					<Typography variant='caption'>Just a bit more!</Typography>
				) : (
					<Typography variant='caption'>Next: {nextStep[0].title}</Typography>
				)}
			</Grid>
		</div>
	);
};
export default Registration;
