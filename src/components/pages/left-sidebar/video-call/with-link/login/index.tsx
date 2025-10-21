import VideoCallBotIcon from '@/assets/vide-call-robot-icon';
import { NextButton } from '@/components/atoms/Button';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { TextField, Yup } from '@/components/atoms/Form';
import { useRouter } from 'next/router';
import { useTwilio_GetVideoRoomTokenMutation, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import { v4 as uuid } from 'uuid';
import { useSnapshot } from 'valtio';
import twilioUserStore from '@/store/twilio-user.store';

interface Props {
	setToken: Dispatch<SetStateAction<string | null>>;
}

const LoginTwilioVideoCall = ({ setToken }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const Room = router?.query?.code;

	const {useId} = useSnapshot(twilioUserStore)

	useEffect(() => {
		if(useId === null){
			twilioUserStore.useId = `User-${uuid()}`
		}

	},[useId])

	const { mutate: GetTokenRoom } = useTwilio_GetVideoRoomTokenMutation();

	const joinToRoomHandler = async () => {
		GetTokenRoom(
			{
				identity: twilioUserStore.useId,
				roomName: Room as string,
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						setToken(result);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack width={'100%'} height={'100%'} p={2}>
			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={4}>
				<Typography
					fontSize={'24px'}
					fontWeight={'bold'}
					alignItems={'center'}
					color={theme?.palette?.infuuse?.blue100}
				>
					Video Call
				</Typography>
			</Stack>

			<Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
				<Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
					<Box mb={4}>
						<VideoCallBotIcon />
					</Box>

					<NextButton onClick={joinToRoomHandler} sx={{ mb: 2, width: '300px' }}>
						Join To Room
					</NextButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LoginTwilioVideoCall;

// -------------------------------schema
const VideCallSchema = Yup.object().shape({
	// name: Yup.string().required('Enter Your User Name').min(2),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
	},
}));
