import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import {
	DealStatus,
	TypeContactNetwork,
	useContact_GetByContactIdQuery,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { Props } from '../types';

const ChatBoxHeader = ({contactId}:Partial<Props>) => {
	const theme = useTheme();
	const router = useRouter();

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

	const NetworkEmailsData = NetworkEmails?.data?.contactNetwork_getListByContactId?.result;

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} p={1} height={'100%'}>
			<Avatar src={getFullImageUrl(CurrentContactData?.photoUrl)} width={'60px'} height={'60px'} />

			<Stack>
				<Typography
					fontSize={'16px'}
					color={theme?.palette?.infuuse?.blue500}
					fontWeight={'bold'}
					ml={2}
					mb={1}
					mt={1}
				>
					{CurrentContactData?.fullName ? CurrentContactData?.fullName :  NetworkEmailsData?.items?.[0]?.value}
				</Typography>

				{router?.pathname?.includes('/internal-chat') ? null : router?.pathname?.includes('/support') ? null : (
					<Box ml={2}>
						<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue100} fontSize={'14px'}>
							{CurrentContactData?.dealStatus === DealStatus?.ClosedWon
								? 'Closed Won'
								: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
									? 'Appointment Scheduled'
									: 'Lead'}
						</Typography>
					</Box>
				)}
			</Stack>
		</Stack>
	);
};

export default ChatBoxHeader;
