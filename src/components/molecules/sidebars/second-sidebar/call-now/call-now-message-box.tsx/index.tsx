import PhoneIcon from '@/assets/phone-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { Box, CircularProgress, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import useCallHandler from '@/hooks/useCallHandler';
import { useChatContext } from '@/providers/chat-provider';
import { useSnapshot } from 'valtio';
import callStatusStore from '@/store/call-status.store';
import { getFullImageUrl } from '@/utils';
import DilarIcon from '@/assets/dilar-icon';
import PauseIcon from '@mui/icons-material/Pause';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';

interface Props {
	item: never;
}

const CallNowMessageBox = ({ item }: Props) => {
	console.log('call message box item', item);

	const theme = useTheme()

	// --------------------------------------  context
	// chat context
	const {
		handleChangeCallStatus
	} = useChatContext();

	// usehook use call handler
	const {

		startCallHandler,
		rejectCallHandler,
		handleUnHold,
		holdCallHandler,
		handleMute,
		handleUnMute,
	} = useCallHandler();


	// --------------------------state managment
	const { isLoading, callSid } = useSnapshot(callStatusStore)


	// --------------------------states
	const [mute, setMute] = useState(false);

	let loading = callSid === item?.callSid && isLoading

	// --------------------------functions
	//  answer call
	const answerCall = () => {
		console.log('call messagebox connection', item?.connection);

		if (item?.connection) {
			handleChangeCallStatus(
				item?.callSid as string,
				'in-progress'
			);
			item?.connection.accept();
		} else {
			startCallHandler(item?.callSid as string)
		}
	}

	// hold call
	const handleToggleOnHoldCall = () => {
		if (item?.callStatus === 'on-hold') {
			handleUnHold(item?.callSid as string);
			return;
		}

		holdCallHandler(item?.callSid as string);
	}


	// mute call
	const handleToggleOnMuteCall = () => {
		setMute(!mute)
		if (item?.connection) {
			if (item?.connection.isMuted) {
				item?.connection.mute(false);
			} else {
				item?.connection.mute(true);
				return;
			}
		}

		if (item?.callStatus === 'on-mute') {
			handleUnMute(item);
			return;
		}

		handleMute(item);
	}



	// reject call
	const rejectCall = () => {
		item?.connection?.disconnect();
		rejectCallHandler(item?.callSid as string)
	}

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			borderRadius={2}
			p={'16px'}
			mb={2}
			bgcolor={theme?.palette?.infuuse?.blueLight400}
		>
			<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
				<Stack mr={1}>
					<Avatar src={getFullImageUrl(item?.user?.photoUrl)} width={'60px'} height={'60px'} />
				</Stack>

				<Stack width={'100%'}>
					<Typography mb={1} fontWeight={'bold'} color={theme?.palette?.common?.white}>
						{stringSlicer(item?.user?.fullName ? item?.user?.fullName : item?.from, 20)}
					</Typography>

					{/* <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={2}>
						<Typography color={theme?.palette?.common?.white} ml={1}>
							+123456789
						</Typography>
					</Stack> */}

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
						{item.callStatus === 'queued' && <DilarButton sx={{ bgcolor: !item?.connection ? theme?.palette?.infuuse?.green300 : theme?.palette?.infuuse?.orange200 }} onClick={!loading && answerCall}>
							{loading ? <CircularProgress size={16} sx={{ color: theme?.palette?.common?.white }} /> : <PhoneIcon width="24px" height="24px" fill={theme?.palette?.common?.white} />}
						</DilarButton>}

						{item.callStatus === 'in-progress' && (
							<DilarIcon />
						)}

						{(item.callStatus === 'in-progress' || item.callStatus === 'on-hold') && (
							<DilarButton
								sx={{ backgroundColor: item.callStatus !== 'on-hold' ? theme?.palette?.infuuse?.orange200 : theme?.palette?.common?.white }}
								onClick={handleToggleOnHoldCall}>
								<PauseIcon sx={{ width: '24px', height: '24px', fill: item.callStatus !== 'on-hold' ? theme?.palette?.common?.white : theme?.palette?.infuuse?.orange200 }} />
							</DilarButton>
						)}

						{item.callStatus === 'in-progress' && (
							<DilarButton
								sx={{ backgroundColor: '#E0E3EA' }}
								onClick={handleToggleOnMuteCall}>
								{mute ? <RecordVoiceOverIcon /> : <VoiceOverOffIcon />}
							</DilarButton>
						)}

						<DilarButton sx={{ bgcolor: theme?.palette?.infuuse?.red300 }} onClick={rejectCall}>
							<PhoneIcon width="24px" height="24px" fill={theme?.palette?.common?.white} />
						</DilarButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CallNowMessageBox;

export const DilarButton = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '360px',
	width: '36px',
	height: '36px',
	cursor: 'pointer',
	'&:hover': {
		background: theme?.palette?.infuuse.blue100,
		color: theme?.palette?.common?.white,
	},
}));
