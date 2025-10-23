import React from 'react';
import { Grid, Stack, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import OwnerIcon from '@/assets/owner-icon';
import AgencyIcon from '@/assets/agency-icon';
import { DownButtonContainer, SignContainer } from '../../../styles';
import SignHeader from '../../../sign-header';
import AuthSection from '../../..';

import { NextButton } from '@/components/atoms/Button';
import userTypeStore from '@/store/userType.store';
import { useSnapshot } from 'valtio';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';
import { UserType } from '@/providers/Auth/without-graphql/type';

const Step1 = () => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const { userType } = useSnapshot(userTypeStore);
	const { setSignupStepCounter } = useAuth();

	console.log('userType',userType);
	

	return (
		<AuthSection>
			<SignContainer
				direction="column"
				sx={{
					'@media(max-width:1200px)': {
						minHeight: '620px',
						maxHeight: '620px',
					},
					'@media(min-width:1200px)': {
						maxHeight: '400px',
					},
				}}
			>
				<SignHeader title="Select User Type" description="Are You?" />

				{/* -------------------------------user type */}
				<Grid container justifyContent={'space-around'} alignItems={'center'}>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<Grid container justifyContent={'center'} alignItems={'center'}>
							{/* -------------------------------owner cart*/}
							<Cart
								direction="column"
								onClick={() => (userTypeStore.userType = UserType?.BusinessMember)}
								border={
									userType === UserType?.BusinessMember
										? `3px solid ${theme?.palette?.infuuse.orange200}`
										: `3px solid ${theme?.palette?.infuuse.gray300}`
								}
							>
								<Stack mb={2}>
									<OwnerIcon />
								</Stack>
								<Typography fontSize={'16px'} color={theme?.palette?.infuuse.blueLight400} mb={2}>
									Business Owner
								</Typography>
								<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight200}>
									Hello! Is The Consultation These Five Tips Will Help
								</Typography>
							</Cart>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} mt={isMobile ? 4 : 0}>
						<Grid container justifyContent={'center'} alignItems={'center'}>
							{/* -------------------------------agency cart*/}
							<Cart
								direction="column"
								onClick={() => (userTypeStore.userType = UserType?.AgencyMember)}
								border={
									userType === UserType?.AgencyMember
										? `3px solid ${theme?.palette?.infuuse.orange200}`
										: `3px solid ${theme?.palette?.infuuse.gray300}`
								}
							>
								<Stack mb={2}>
									<AgencyIcon />
								</Stack>
								<Typography fontSize={'16px'} color={theme?.palette?.infuuse.blueLight400} mb={2}>
									Agency{' '}
								</Typography>
								<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight200}>
									Hello! Is The Consultation These Five Tips Will Help{' '}
								</Typography>
							</Cart>
						</Grid>
					</Grid>
				</Grid>

				{/* ------------------------------- button */}
				<DownButtonContainer>
					<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
						<NextButton
							onClick={() => setSignupStepCounter(1)}
							sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}
						>
							Next
						</NextButton>
					</Stack>
				</DownButtonContainer>
			</SignContainer>
		</AuthSection>
	);
};

export default Step1;

export const Cart = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
	height: '200px',
	width: '200px',
	backgroundColor: theme?.palette?.infuuse.gray300,
	borderRadius: '16px',
	textAlign: 'center',
	padding: '16px',
	cursor: 'pointer',
}));
