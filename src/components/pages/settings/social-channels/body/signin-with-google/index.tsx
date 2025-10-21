import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import LightIcon from '@/assets/light-icon';
import GoogleIcon from '@/assets/google-icon';
import { NextButton } from '@/components/atoms/Button';
import { useBusiness_GetGmailAuthLinkQuery } from '@/graphql/generated';

const SigninWithGoogleSocialChannel = () => {
	const theme = useTheme();

	const [link, setLink] = useState();

	const { data: gmailAuthLink } = useBusiness_GetGmailAuthLinkQuery({
		callbackUrl: `${window.location.origin}/social-channels`,
	});

	const getLinkHandeler = () => {
		window.location.href = gmailAuthLink?.business_getGmailAuthLink?.result;
	};

	return (
		<Stack>
			<Stack width="100%" direction="row" justifyContent="end" alignItems="center" mb={1}>
				<NextButton onClick={getLinkHandeler} startIcon={<GoogleIcon />} sx={{ width: '275px' }}>
					Sign in with Google
				</NextButton>
			</Stack>
			<Stack
				bgcolor={theme?.palette?.infuuse?.gray400}
				p={2}
				borderRadius={1}
				direction="row"
				justifyContent="start"
				alignItems="start"
				height="150px"
				overflow="auto"
			>
				<Box>
					<LightIcon />
				</Box>
				<Typography>
					InFUUSE complies with the Google API Services User Data Policy, including the Limited Use
					requirements. We use and transfer information received from Google APIs only for the purposes of
					providing our app's essential features and services. We do not use or share user data for any other
					purposes, and we take appropriate measures to protect user privacy and security.
				</Typography>
			</Stack>
		</Stack>
	);
};

export default SigninWithGoogleSocialChannel;
