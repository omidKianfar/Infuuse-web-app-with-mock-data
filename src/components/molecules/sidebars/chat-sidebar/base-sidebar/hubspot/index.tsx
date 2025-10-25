import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '..';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { useContact_GetByContactIdQuery, useHubSpot_SyncSingleContactWithHubSpotMutation } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import SyncIcon from '@mui/icons-material/Sync';

const HubspotSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId
	const BusinessId = router?.query?.businessId

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);


	const { data: Contact } = useContact_GetByContactIdQuery({
		contactId: Number(ContactId)
	})
	const ContactData = Contact?.contact_getByContactId?.result


	const { mutate: SyncContactHubSpot } = useHubSpot_SyncSingleContactWithHubSpotMutation()

	const hubspotSync = () => {
		SyncContactHubSpot(
			{
				contactId: Number(ContactId),
				businessId: Number(BusinessId)
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						queryClient.invalidateQueries(['contact_getByContactId']);
						enqueueSnackbar(status.description, { variant: 'success' });
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	}


	return (
		<Stack
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------header */}
			<Stack textAlign={'center'}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'60px'}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						HubSpot
					</Typography>

					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Box
							sx={{ cursor: 'pointer' }}
							onClick={() =>
								setSidebars({
									...sidebars,
									hubspot: false,
								})
							}
						>
							<CloseIconBox />
						</Box>
					</Stack>
				</Stack>

				{/* -------------------------------fields */}

				{!ContactData?.hubSpotContactId
					? <Typography mb={'50px'} fontSize={'16px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
						Do you agree to the transfer of contact information to HobSpot?
					</Typography>

					: <Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						mb={'100px'}
						border={`2px solid ${theme?.palette?.infuuse?.blue100}`}
						borderRadius={2}
						p={1}
					>
						<Typography ml={1} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100}>
							Your contact has been synced with HubSpot, your contact will be synced automatically
						</Typography>
					</Box>}

				{/* ------------------------------- footer */}
				{!ContactData?.hubSpotContactId &&
					<Stack width={'100%'} direction={'row'} alignItems={'center'}>
						<NextButton onClick={hubspotSync} startIcon={<SyncIcon />} sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
							Sync Contact
						</NextButton>
					</Stack>}
			</Stack>
		</Stack>
	);
};

export default HubspotSidebar;
