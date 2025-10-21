import { TypeContactNetwork, useContactNetwork_GetListByContactIdQuery } from '@/graphql/generated';
import settingLiveChatStore from '@/store/setting-live-chat.store';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useSnapshot } from 'valtio';

interface Props {
	message: any;
}

const Footer = ({ message }: Props) => {
	const theme = useTheme();
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const ContactId = router?.query?.contactId;

	// -------------------------------state management
	const { contactEmail } = useSnapshot(settingLiveChatStore);

	// -------------------------------query

	// network emails
	const NetworkEmails = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(ContactId),
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
		<Stack
			direction={isMobile ? 'column' : 'row'}
			justifyContent={
				router.pathname.includes('/contact-chat')
					? message?.conversationMemberId
						? 'start'
						: 'end'
					: message?.conversationMemberId
					? 'end'
					: 'start'
			}
			alignItems={'center'}
			width={'100%'}
			pl={
				isMobile
					? 0
					: router.pathname.includes('/contact-chat')
					? message?.conversationMemberId
						? '40px'
						: 0
					: message?.conversationMemberId
					? 0
					: '40px'
			}
			pr={
				isMobile
					? 0
					: router.pathname.includes('/contact-chat')
					? message?.conversationMemberId
						? 0
						: '40px'
					: message?.conversationMemberId
					? '40px'
					: 0
			}
		>
			<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500} mr={2}>
				{router.pathname.includes('/contact-chat')
					? message?.conversationMemberId
						? message?.conversationMember?.user?.email
						: contactEmail
					: message?.conversationMemberId
					? message?.conversationMember?.user?.fullName
						? message?.conversationMember?.user?.fullName
						: message?.conversationMember?.user?.email
					: message?.conversation?.contact?.fullName
					? message?.conversation?.contact?.fullName
					: NetworkEmailsData?.items[0]?.value}
			</Typography>

			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
				<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500} mr={2}>
					{dayjs(message?.createdDate).format('MM/DD/YYYY')}
				</Typography>

				<Typography fontSize={'14px'} color={theme?.palette?.infuuse?.blue500}>
					{dayjs(message?.createdDate).format('hh:mm A')}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Footer;
