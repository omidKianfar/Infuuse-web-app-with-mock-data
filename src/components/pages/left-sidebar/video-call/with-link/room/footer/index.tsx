import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import TwilioVideo from 'twilio-video';
import ModalContainer from '@/components/atoms/Modal';
import InviteModal from './modal';

interface Props {
	handleLogoutRoom: () => void;

	localParticipant: TwilioVideo.LocalParticipant;
}

const Controllers = ({ handleLogoutRoom, localParticipant }: Props) => {
	const theme = useTheme();

	const [cameraOn, setCameraOn] = useState<boolean>(true);
	const [soundOn, setSoundOn] = useState<boolean>(true);

	const HandelAudio = () => {
		setSoundOn(!soundOn);
	};
	const HandelVideo = () => {
		setCameraOn(!cameraOn);
	};

	useEffect(() => {
		if (soundOn) {
			localParticipant.audioTracks.forEach((publication) => {
				publication.track.enable();
			});
		} else {
			localParticipant.audioTracks.forEach((publication) => {
				publication.track.disable();
			});
		}
		if (cameraOn) {
			localParticipant.videoTracks.forEach((publication) => {
				publication.track.enable();
			});
		} else {
			localParticipant.videoTracks.forEach((publication) => {
				publication.track.disable();
			});
		}
	}, [soundOn, cameraOn]);

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<Stack
			direction={'row'}
			justifyContent={'start'}
			alignItems={'center'}
			width={'100%'}
			zIndex={100}
			position="absolute"
			bottom={0}
			left={0}
			p={2}
			height={'80px'}
		>
			<Stack justifyContent={'center'} alignItems="start" position="relative" width={'45%'}>
				<Box
					sx={{
						cursor: 'pointer',
					}}
					onClick={handelModal}
				>
					<InfoIcon sx={{ fill: theme?.palette?.common?.white, width: '36px', height: '36px' }} />
				</Box>

				<Typography fontSize="10px" fontWeight={500} color={theme?.palette?.common?.white} textAlign="center">
					Info
				</Typography>
			</Stack>

			<Stack direction={'row'} justifyContent={'start'} alignItems="center" width={'55%'}>
				<Stack justifyContent={'center'} alignItems="center" mr={4}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						bgcolor={theme?.palette?.common?.black}
						borderRadius={'360px'}
						width={'40px'}
						height={'40px'}
						sx={{
							cursor: 'pointer',
						}}
						onClick={HandelVideo}
					>
						{cameraOn ? (
							<VideocamIcon sx={{ width: '24px', height: '24px', fill: theme?.palette?.common?.white }} />
						) : (
							<VideocamOffIcon
								sx={{ width: '24px', height: '24px', fill: theme?.palette?.common?.white }}
							/>
						)}
					</Box>

					<Typography
						fontSize="10px"
						fontWeight={500}
						color={theme?.palette?.common?.white}
						textAlign="center"
						marginTop="5px"
					>
						{!cameraOn ? 'Camera Off' : 'Camera On'}
					</Typography>
				</Stack>

				<Stack alignItems="center" mr={4}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						bgcolor={theme?.palette?.common?.black}
						borderRadius={'360px'}
						width={'40px'}
						height={'40px'}
						sx={{
							cursor: 'pointer',
						}}
						onClick={HandelAudio}
					>
						{soundOn ? (
							<KeyboardVoiceIcon
								sx={{ width: '24px', height: '24px', fill: theme?.palette?.common?.white }}
							/>
						) : (
							<MicOffIcon sx={{ width: '24px', height: '24px', fill: theme?.palette?.common?.white }} />
						)}
					</Box>

					<Typography
						fontSize="10px"
						fontWeight={500}
						color={theme?.palette?.common?.white}
						textAlign="center"
						marginTop="5px"
					>
						{!soundOn ? 'Mute' : 'Unmute'}
					</Typography>
				</Stack>

				<Box display="flex" flexDirection="column" alignItems="center">
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						bgcolor={theme?.palette?.infuuse?.red300}
						borderRadius={'360px'}
						width={'40px'}
						height={'40px'}
						sx={{
							cursor: 'pointer',
						}}
						onClick={handleLogoutRoom}
					>
						<CloseIcon sx={{ width: '24px', height: '24px', fill: theme?.palette?.common?.white }} />
					</Box>

					<Typography
						fontSize="10px"
						fontWeight={500}
						color={theme?.palette?.common?.white}
						textAlign="center"
						marginTop="5px"
					>
						End
					</Typography>
				</Box>
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				<InviteModal handleClose={handleClose} />
			</ModalContainer>
		</Stack>
	);
};

export default Controllers;
