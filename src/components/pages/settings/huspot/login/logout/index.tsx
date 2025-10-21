import { Box, Stack, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { HeadComment, HubspotContainer, Label } from '../../styles';
import { NextButton } from '@/components/atoms/Button';
import HubspotPlayIcon from '@/assets/hubspot-play-icon';
import LogoutIcon from '@/assets/logout-icon';
import {
	useHubSpot_GetAuthLinkQuery,
	useHubSpot_SetByBusinessIdMutation,
	UserDto,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { useRouter } from 'next/router';

interface Props {
	CurrentUser: UserDto
}

const HobspotLoginLogout = ({ CurrentUser }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const code = router?.query?.code;

	const MyLocation = location.origin;
	const redirectUrl = `${MyLocation}/HubSpot`;


	const { data: hubSpotGenerate } = useHubSpot_GetAuthLinkQuery({
		redirectLink: redirectUrl as string
	});
	const URL = hubSpotGenerate?.hubSpot_getAuthLink?.result;

	const { mutate: businessHubSpot } = useHubSpot_SetByBusinessIdMutation();



	const loginHubspot = () => {
		if (hubSpotGenerate) {
			window.location.href = URL as string;
		}
	};

	useEffect(() => {
		if (code) {
			hubSpotHandler();
		}
	}, [code]);

	const hubSpotHandler = () => {
		businessHubSpot(
			{
				code: code as string,
				businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
				redirectLink: redirectUrl as string
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
					} else {
					}
				},
			}
		);
	};


	return (
		<HubspotContainer>
			<HeadComment direction={'row'} justifyContent={'start'} alignItems={'start'} spacing={1}>
				<Box>
					<HubspotPlayIcon />
				</Box>

				<Stack>
					<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
						HubSpot Is A CRM Platform That Brings Everything Scaling Companies Need To Deliver A
						Best-In-Class Customer Experience Into One Place.
					</Label>
					<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
						Infuuse Allows You To Sync Your Infuuse Contacts With HubSpot And Synchronize Your Data. You
						Can Create Deals For Your Customers Here And We Will Track Them For You As Other Employees
						Work On HubSpot And Update The Status.
					</Label>
				</Stack>
			</HeadComment>

			{/* ------------------------------- button */}

			<Stack width={'100%'} justifyContent={'center'} alignItems={'center'} mt={4}>

				<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
					Use The Button Below logout hubSpot
				</Label>

				<Stack width={'100%'} direction={'row'} justifyContent={'center'} alignItems={'center'} mt={2}>
					<NextButton
						onClick={loginHubspot}
						sx={{ width: '270px', fontSize: '16px', fontWeight: 600 }}
						startIcon={<LogoutIcon fill={theme?.palette?.common?.white} />}
						isLoading={!hubSpotGenerate}
						disabled={!hubSpotGenerate}
					>
						Log In HubSpot
					</NextButton>
				</Stack>
			</Stack>

		</HubspotContainer>
	);
};

export default HobspotLoginLogout;
