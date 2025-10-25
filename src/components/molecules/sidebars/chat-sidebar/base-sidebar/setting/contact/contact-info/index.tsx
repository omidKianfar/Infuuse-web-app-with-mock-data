import EditIcon from '@/assets/edit-icon';
import EmailIcon from '@/assets/email-icon';
import PhoneIcon from '@/assets/phone-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '../../..';
import {
	DealStatus,
	TypeContactNetwork,
	useContact_GetByContactIdQuery,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { getFullImageUrl } from '@/utils';

const HeaderContactInfo = () => {
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;

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

	const NetworkPhones = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
	});

	const contactPhones = NetworkPhones?.data?.contactNetwork_getListByContactId?.result?.items[0]?.value;

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);
	return (
		<Stack>
			<Stack
				position={'absolute'}
				left={0}
				top={'-50px'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'100%'}
			>
				<Box
					borderRadius={'360px'}
					width={'100px'}
					height={'100px'}
					bgcolor={theme?.palette?.infuuse?.gray100}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					border={`3px solid ${theme?.palette?.infuuse?.gray100}`}
				>
					<Avatar src={getFullImageUrl(CurrentContactData?.photoUrl)} width={'85px'} height={'85px'} />
				</Box>

				{/* -------------------------------edit contact */}
				<Box
					onClick={() =>
						setSidebars({
							...sidebars,
							contact: true,
						})
					}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						left: '8px',
						top: '60px',
						cursor: 'pointer',
						zIndex: 2,
					}}
				>
					<EditIcon width="28px" height="28px" fill={theme?.palette?.infuuse?.blue100} />
				</Box>
			</Stack>

			<Stack position={'relative'} width={'100%'} height={'100%'} pt={'50px'} textAlign={'center'}>
				<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} mb={1}>
					{stringSlicer(CurrentContactData?.fullName, 30)}
				</Typography>

				<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} mb={1}>
					{stringSlicer(
						CurrentContactData?.dealStatus === DealStatus?.ClosedWon
							? 'Closed Won'
							: CurrentContactData?.dealStatus === DealStatus?.AppointmentScheduled
							? 'Appointment Scheduled'
							: 'Lead'
					)}
				</Typography>

				{contactPhones && (
					<Box mb={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<PhoneIcon width="24px" height="24px" fill={theme?.palette?.infuuse?.red100} />
						<Typography color={theme?.palette?.infuuse?.blue500} ml={1}>
							{stringSlicer(contactPhones, 30)}
						</Typography>
					</Box>
				)}

				{contactEmail && (
					<Box mb={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<EmailIcon width="24px" height="24px" fill={theme?.palette?.infuuse?.blue100} />
						<Typography color={theme?.palette?.infuuse?.blue500} ml={1}>
							{stringSlicer(contactEmail, 30)}
						</Typography>
					</Box>
				)}
			</Stack>
		</Stack>
	);
};

export default HeaderContactInfo;
