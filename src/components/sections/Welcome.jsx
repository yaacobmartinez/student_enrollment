import React from "react";
import {
	Container,
	Typography,
	makeStyles,
	Link,
	Slide,
} from "@material-ui/core";
import { PageHeroTitle } from "../customStyledComponents/Text";

const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(6),
	},
	actions: {
		marginTop: theme.spacing(4),
	},
}));
function Welcome({ actions }) {
	const classes = useStyles();
	return (
		<div>
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md' className={classes.main}>
					<PageHeroTitle
						title='Generic Student Enrollment'
						caption='A system for your school'
					/>
					<div className={classes.actions}>
						<Typography variant='body1'>Actions</Typography>
						{actions.map((action) => (
							<Link key={action.href} href={action.href}>
								<Typography variant='body2'>{action.title}</Typography>
							</Link>
						))}
					</div>
				</Container>
			</Slide>
		</div>
	);
}

export default Welcome;
