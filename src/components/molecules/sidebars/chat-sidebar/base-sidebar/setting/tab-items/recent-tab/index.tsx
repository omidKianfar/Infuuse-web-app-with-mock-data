import GmailIcon from '@/assets/gmail-icon';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@/assets/phone-icon';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@/assets/facebook-icon';
import SmsIcon from '@/assets/sms-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import dayjs from 'dayjs';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

interface Props {
	scrollToTab: () => void;
}

const ReacentTab = ({ scrollToTab }: Props) => {
	const theme = useTheme();
	return (
		<></>
		// <Stack width={'100%'} height={'100%'}>
		// 	<Stack
		// 		mb={1}
		// 		width={'100%'}
		// 		border={`2px solid ${theme?.palette?.infuuse?.gray400}`}
		// 		bgcolor={theme?.palette?.common?.white}
		// 		borderRadius={2}
		// 		direction={'row'}
		// 		justifyContent={'space-between'}
		// 		alignItems={'center'}
		// 		p={1}
		// 	>
		// 		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
		// 			<Box mr={1} display={'flex'} justifyContent={'start'} alignItems={'center'}>
		// 				{/* <GmailIcon
		// 					width="24px"
		// 					height="24px"
		// 					fill={{
		// 						fill1: '#EA4335',
		// 						fill2: '#FBBC05',
		// 						fill3: '#34A853',
		// 						fill4: '#C5221F',
		// 						fill5: '#4285F4',
		// 					}}
		// 				/> */}

		// 				<PhoneIcon width="24px" height="24px" fill={theme?.palette?.infuuse.green300} />

		// 				{/* <FacebookIcon width="24px" height="24px" fill={theme?.palette?.infuuse.blueDark400} /> */}

		// 				{/* <InstagramIcon
		// 					sx={{ width: '24px', height: '24px', fill: theme?.palette?.infuuse.porple200 }}
		// 				/> */}

		// 				{/* <WhatsAppIcon sx={{ width: '24px', height: '24px', fill: theme?.palette?.infuuse.green300 }} /> */}

		// 				{/* <SmsIcon width="24px" height="24px" fill={theme?.palette?.infuuse.porple200} /> */}

		// 				{/* <LiveChatIcon width="24px" height="24px" fill={theme?.palette?.infuuse.green300} /> */}
		// 			</Box>

		// 			<Typography color={theme?.palette?.infuuse.blue500} fontWeight={'bold'}>
		// 				{dayjs().format('ddd')}
		// 			</Typography>
		// 		</Stack>
		// 		<Typography color={theme?.palette?.infuuse.green300} fontWeight={'bold'}>
		// 			{secToHHMMSS(1)}
		// 		</Typography>
		// 		<Typography color={theme?.palette?.infuuse.orange100} fontWeight={'bold'}>
		// 			{dayjs().format('hh:mm A')}
		// 		</Typography>
		// 	</Stack>

		// 	{NotesData?.items?.length >= 5 && (
		// 		<Box
		// 			sx={{ cursor: 'pointer' }}
		// 			onClick={scrollToTab}
		// 			position={'fixed'}
		// 			right={'8px'}
		// 			bottom={'8px'}
		// 			bgcolor={theme?.palette?.infuuse?.blue100}
		// 			borderRadius={2}
		// 			display={'flex'}
		// 			justifyContent={'center'}
		// 			alignItems={'center'}
		// 			p={'2px'}
		// 		>
		// 			<KeyboardDoubleArrowUpIcon />
		// 		</Box>
		// 	)}

		// </Stack>
	);
};

export default ReacentTab;

export const secToHHMMSS = (time) => {
	const hour = Math.floor(time / 3600);
	const hourConvert = hour < 10 ? `0${hour}` : hour;

	const min = Math.floor((time / 60) % 60);
	const minConvert = min < 10 ? `0${min}` : min;

	const sec = Math.floor(time % 60);
	const secConvert = sec < 10 ? `0${sec}` : sec;

	return `${hourConvert} : ${minConvert} : ${secConvert}`;
};
