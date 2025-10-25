import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { FooterSection } from './styles';
import Image from '@/components/atoms/Image';

const AuthFooter = () => {
	const theme = useTheme();
	const router = useRouter();

	const routeHandler = () => {
		if (router.pathname.includes('/signup')) {
			router.push('/signin');
		} else {
			router.push('/signup');
		}
	};

	return (
		<Stack position={'relative'}>
			<FooterSection direction={'row'}>
				<Stack direction="row" justifyContent="center" alignItems="center" width={'100%'}>
					<Box>
						<Typography mr={2} sx={{ wordBreak: 'keep-all' }}>
							{router.pathname.includes('/signup') ? 'Already have an account?' : 'New to INFUUSE?'}
						</Typography>
					</Box>

					<Box onClick={routeHandler} sx={{ cursor: 'pointer' }}>
						<Typography
							fontSize={'16px'}
							fontWeight={600}
							color={theme?.palette?.infuuse.blue200}
							sx={{
								wordBreak: 'keep-all',
								'&:hover': {
									color: theme?.palette?.infuuse.blueDark100,
								},
							}}
						>
							{router.pathname.includes('/signup') ? 'Sign In' : 'Join now'}{' '}
						</Typography>
					</Box>
				</Stack>
			</FooterSection>

			{/* -------------------------------down image */}
			<Stack position={'absolute'} top={0} left={0} zIndex={1}>
				<Image src={'/images/auth-down.png'} style={{ width: '100%', height: 'auto' }} />
			</Stack>
		</Stack>
	);
};

export default AuthFooter;
