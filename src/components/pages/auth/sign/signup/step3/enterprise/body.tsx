import LightIcon from '@/assets/light-icon';
import { NextButton } from '@/components/atoms/Button';
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

const BodyEnterprise = () => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Stack position={'relative'} width={'100%'} height={isMobile ? '700px' : '680px'}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
				<Typography fontSize={'18px'} color={theme?.palette?.infuuse.blueDark500} mb={2}>
					Enterprise
				</Typography>
			</Stack>
			<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px', mb: 4 }} />
			<Stack direction={'row'}>
				<Box mr={2}>
					<LightIcon />
				</Box>
				<Typography fontSize={'16px'} color={theme?.palette?.infuuse.blueLight400}>
					For Our Enterprise Plan, Email Us To Learn More: Tanyette@In-Fuuse.Com
				</Typography>
			</Stack>
			<Stack position={'absolute'} bottom={0} left={0} width={'100%'}>
				<Divider sx={{ bgcolor: theme?.palette?.infuuse.gray500, height: '2px', mb: 4 }} />

				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
					<Link href={'mailto:tabyette@in-fuuse.com'}>
						<NextButton
							type="submit"
							sx={{ width: '85%', fontSize: '18px', fontWeight: 'bold', width:isMobile ? '80vw' :'420px' }}
						>
							Send Email{' '}
						</NextButton>
					</Link>

				</Stack>
			</Stack>
		</Stack>
	);
};

export default BodyEnterprise;
