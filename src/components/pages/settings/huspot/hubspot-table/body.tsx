import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { StyledTableCell, StyledTableRow } from '../styles';
import dayjs from 'dayjs';
import {
	Contact,
	TypeContactNetwork,
	useContactNetwork_GetListByContactIdQuery,
	useHubSpot_SyncSingleContactWithHubSpotMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { queryClient } from 'pages/_app';
import { enqueueSnackbar } from 'notistack';
import SyncIcon from '@mui/icons-material/Sync';

interface Props {
	contact: Contact;
}

const Body = ({ contact }: Props) => {
	// ------------------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;


	// contact networks email
	const { data: NetworkEmail } = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contact?.id),
		skip: 0,
		take: 1,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
	});

	const ContactEmail = NetworkEmail?.contactNetwork_getListByContactId?.result;

	// contact networks phoneNumber
	const { data: NetworkPhoneNumber } = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contact?.id),
		skip: 0,
		take: 1,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
	});

	const ContactPhoneNumber = NetworkPhoneNumber?.contactNetwork_getListByContactId?.result;

	const { mutate: SyncContactHubSpot } = useHubSpot_SyncSingleContactWithHubSpotMutation()

	// ------------------------------------------functions
	const hubspotSync = () => {
		SyncContactHubSpot(
			{
				contactId: Number(contact?.id),
				businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id)
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.invalidateQueries(['contact_getListByBusinessId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	}

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(contact?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(contact?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer(ContactEmail?.items[0]?.value, 25)}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{ContactPhoneNumber?.items[0]?.value}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Avatar src={getFullImageUrl(contact?.business?.logo)} width={'42px'} height={'42px'} />
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(contact?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{!contact?.hubSpotContactId &&
					<Box onClick={hubspotSync} sx={{ cursor: 'pointer' }}>
						<SyncIcon />
					</Box>}

			</StyledTableCell>
		</StyledTableRow>
	);
};

export default Body;
