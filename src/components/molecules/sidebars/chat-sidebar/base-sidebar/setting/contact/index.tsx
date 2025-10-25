import { Stack, useTheme } from '@mui/material';
import React from 'react';
import HeaderContactInfo from './contact-info';

const ContactInfo = () => {
	const theme = useTheme();

	return (
		<Stack
			position={'relative'}
			border={`3px solid ${theme?.palette?.infuuse.gray200}`}
			height={'190px'}
			borderRadius={'16px'}
			mt={'40px'}
			p={1}
			bgcolor={theme?.palette?.infuuse.gray200}
			mb={1}
		>
			<HeaderContactInfo />
		</Stack>
	);
};

export default ContactInfo;
