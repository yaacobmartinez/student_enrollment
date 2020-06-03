import React from "react";
import CustomAppBar from "../sections/AppBar";
import { Slide, Container, Avatar } from "@material-ui/core";
import { PageHeroTitle } from "../customStyledComponents/Text";
import { Check } from "@material-ui/icons";

const Success = () => {
	return (
		<div>
			<CustomAppBar />
			<Slide in={true} direction='left'>
				<Container fixed maxWidth='md'>
					<div style={{ display: "flex", alignItems: "flex-start" }}>
						<Avatar
							style={{
								marginTop: 120,
								marginRight: 20,
								height: 60,
								width: 60,
							}}>
							<Check style={{ fontSize: 60 }} />
						</Avatar>
						<PageHeroTitle
							title='Thank you for registering'
							caption='Your school will be contacting you once your registration has been reviewed'
						/>
					</div>
				</Container>
			</Slide>
		</div>
	);
};

export default Success;
