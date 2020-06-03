import React from "react";
import {
	Grid,
	Typography,
	makeStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	Avatar,
	ExpansionPanelDetails,
} from "@material-ui/core";
import {
	ExpandMore,
	Face,
	SupervisorAccount,
	LibraryBooks,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "aliceblue",
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0),
	},
	panel: {
		margin: theme.spacing(0.5, 0),
		backgroundColor: "aliceblue",
		"&.MuiExpansionPanel-root:before": {
			display: "none",
		},
	},
	column: {
		flexBasis: "33.33%",
	},
	doublecolumn: {
		flexBasis: "50%",
	},
	avatar: {
		backgroundColor: "#fff",
		marginRight: 10,
	},
	title: {
		fontSize: 15,
		fontWeight: 600,
	},
	panelDetails: {
		flexDirection: "column",
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
	row: {
		margin: theme.spacing(1, 0),
		display: "flex",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
}));
function Summary({ values }) {
	const classes = useStyles();
	return (
		<>
			<Grid item xs={12}>
				<ExpansionPanel defaultExpanded elevation={0} className={classes.panel}>
					<ExpansionPanelSummary expandIcon={<ExpandMore />}>
						<Avatar className={classes.avatar}>
							<Face fontSize='small' style={{ color: "#446FF3" }} />
						</Avatar>
						<div className={classes.column}>
							<Typography className={classes.title}>
								Student Information
							</Typography>
							<Typography variant='caption' color='textSecondary'>
								Your Basic Information
							</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.panelDetails}>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>{values.first_name}</Typography>
								<Typography variant='caption' color='textSecondary'>
									First Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>{values.middle_name}</Typography>
								<Typography variant='caption' color='textSecondary'>
									Middle Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>{values.last_name}</Typography>
								<Typography variant='caption' color='textSecondary'>
									Last Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.extension_name ? values.extension_name : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Extension
								</Typography>
							</div>
						</div>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>{values.sex}</Typography>
								<Typography variant='caption' color='textSecondary'>
									Sex
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>{values.date_of_birth}</Typography>
								<Typography variant='caption' color='textSecondary'>
									Date of Birth
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.contact ? values.contact : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Contact
								</Typography>
							</div>
							<div className={classes.column} />
						</div>
						<div className={classes.row}>
							<div className={classes.doublecolumn}>
								<Typography variant='body2'>
									{values.houseNumberAndStreet
										? values.houseNumberAndStreet
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									House Address
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.cityMunicipalityProvinceCountry
										? values.cityMunicipalityProvinceCountry
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									City/Municipality/Province
								</Typography>
							</div>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>
			<Grid item xs={12}>
				<ExpansionPanel defaultExpanded elevation={0} className={classes.panel}>
					<ExpansionPanelSummary expandIcon={<ExpandMore />}>
						<Avatar className={classes.avatar}>
							<SupervisorAccount
								fontSize='small'
								style={{ color: "#446FF3" }}
							/>
						</Avatar>
						<div className={classes.column}>
							<Typography className={classes.title}>
								Parent Information
							</Typography>
							<Typography variant='caption' color='textSecondary'>
								Your Parent/Guardian Information
							</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.panelDetails}>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.father_first_name ? values.father_first_name : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Father's First Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.father_middle_name
										? values.father_middle_name
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Father's Middle Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.father_last_name ? values.father_last_name : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Father's Last Name
								</Typography>
							</div>
						</div>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.mother_first_name ? values.mother_first_name : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Mother's First Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.mother_middle_name
										? values.mother_middle_name
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Mother's Middle Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.mother_last_name ? values.mother_last_name : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Mother's Last Name
								</Typography>
							</div>
						</div>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.guardian_first_name
										? values.guardian_first_name
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Guardian's First Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.guardian_middle_name
										? values.guardian_middle_name
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Guardian's Middle Name
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.guardian_last_name
										? values.guardian_last_name
										: "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Guardian's Last Name
								</Typography>
							</div>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>

			<Grid item xs={12}>
				<ExpansionPanel defaultExpanded elevation={0} className={classes.panel}>
					<ExpansionPanelSummary expandIcon={<ExpandMore />}>
						<Avatar className={classes.avatar}>
							<LibraryBooks fontSize='small' style={{ color: "#446FF3" }} />
						</Avatar>
						<div className={classes.column}>
							<Typography className={classes.title}>
								School Information
							</Typography>
							<Typography variant='caption' color='textSecondary'>
								Grade/Year Level and Details
							</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.panelDetails}>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.student_type ? values.student_type : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Student Type
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.gradeLevel ? values.gradeLevel : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Grade Level
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.section ? values.section : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Section
								</Typography>
							</div>
						</div>
						<div className={classes.row}>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.track ? values.track : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Track
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.strand ? values.strand : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Strand
								</Typography>
							</div>
							<div className={classes.column}>
								<Typography variant='body2'>
									{values.semester ? values.semester : "----"}
								</Typography>
								<Typography variant='caption' color='textSecondary'>
									Semester
								</Typography>
							</div>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>
		</>
	);
}

export default Summary;
