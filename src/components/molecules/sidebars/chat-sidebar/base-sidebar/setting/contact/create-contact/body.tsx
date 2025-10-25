import UserIcon from '@/assets/user-icon';
import { NextButton } from '@/components/atoms/Button';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { Stack, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '../../..';
import {
	DealStatus,
	TypeContactNetwork,
	useContact_GetByContactIdQuery,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';

const BodyCreateContact = () => {
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	const { data: CurrentContact } = useContact_GetByContactIdQuery({
		contactId: Number(contactId),
	});
	const CurrentContactData = CurrentContact?.contact_getByContactId?.result;

	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
	});

	const contactEmail = NetworkEmails?.data?.contactNetwork_getListByContactId?.result?.items[0]?.value;

	return (
		<Stack position={'relative'} width={'100%'} height={'100%'} pt={'50px'} textAlign={'center'}>
			<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} mb={1}>
				{stringSlicer(contactEmail, 30)}
			</Typography>

			<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} mb={2}>
				{stringSlicer(
					CurrentContactData?.dealStatus === DealStatus?.ClosedWon
						? 'Closed Won'
						: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
						? 'Appointment Scheduled'
						: 'Lead'
				)}
			</Typography>

			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
				<NextButton
					onClick={() =>
						setSidebars({
							...sidebars,
							contact: true,
						})
					}
					sx={{ width: '100%' }}
					startIcon={<UserIcon fill={theme?.palette?.common?.white} />}
				>
					Create New Contact
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default BodyCreateContact;
