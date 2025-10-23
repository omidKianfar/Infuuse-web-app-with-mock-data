import CloseIconBox from '@/assets/close-icon-box';
import {
	TypeContactNetwork,
	useBusiness_GetByBusinessIdQuery,
	useConversationMessage_SendMessageToGmailMutation,
	useLiveChat_SendMessageByMemberMutation,
	useTwilio_GenerateVideoRoomMutation,
	useTwilio_SendSmsMutation,
} from '@/graphql/generated';
import { Box, Button, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import chatBoxTypeNetworkStore from '@/store/chat-box-type-network.store';
import { useSnapshot } from 'valtio';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'clipboard-copy';
import { DefaultValuesType, Props } from '../../types';

const AddTwilioVideoCall = ({ handleClose }: Partial<Props>) => {
	const theme = useTheme();
	const router = useRouter();

	const conversationId = router.query.conversationId;
	const businessId = Number(router?.query?.businessId);

	const { netWorkType, SendViaTo, SendViaId } = useSnapshot(chatBoxTypeNetworkStore);

	const [room, setRoom] = useState(null);
	const [videoLinkId, setvideoLinkId] = useState(null);

	const { mutate: MemberSendMessage } = useLiveChat_SendMessageByMemberMutation();
	const { mutate: twilioLinkGenerate } = useTwilio_GenerateVideoRoomMutation();
	const { mutate: sendSMS } = useTwilio_SendSmsMutation();
	const { mutate: sendGmailMessage } = useConversationMessage_SendMessageToGmailMutation();

	const { data } = useBusiness_GetByBusinessIdQuery({ businessId });
	const businessName = data?.business_getByBusinessId?.result?.name;

	const defaultValues: DefaultValuesType = {
		note: '',
	};

	const methods = useForm({
		resolver: yupResolver(noteSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const MyLocation = location.origin;

	const url = `${MyLocation}/video-call?code=${room}`;

	const onSubmit = (values: any) => {
		if (netWorkType === 'Live Chat') {
			MemberSendMessage(
				{
					conversationId: Number(conversationId),
					input: {
						message: `<p>${values?.note}<br> <a href='${url}' target='_blank'>${url}</a></p>`,
						conversationAttachments: [],
						twilioHistoryVideoId: Number(videoLinkId),
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							handleClose();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}

		if (netWorkType === TypeContactNetwork?.PhoneNumber) {
			const Message = `${values?.note}\n${url}`;
			console.log('Message', Message);

			sendSMS(
				{
					conversationId: Number(conversationId),
					input: {
						contactNetworkId: Number(SendViaId),
						to: SendViaTo,
						message: Message,
						sendAsMMS: false,
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							handleClose();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}

		if (netWorkType === TypeContactNetwork.Email) {
			sendGmailMessage(
				{
					input: {
						contactNetworkId: Number(SendViaId),
						conversationId: Number(conversationId),
						subject: `${businessName} The meeting link for our appointment`,
						body: `<p>${values?.note}<br> <a href='${url}' target='_blank'>${url}</a></p>`,
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							handleClose();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};

	const linkGeneration = () => {
		twilioLinkGenerate(
			{},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						setRoom(result?.roomName);
						setvideoLinkId(result?.id);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack
			width={'400px'}
			height={'100%'}
			bgcolor={theme?.palette?.infuuse?.gray200}
			borderRadius={2}
			boxShadow={2}
			p={2}
		>
			<Stack position={'relative'} width={'100%'} height={'100%'}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '16px',
							color: theme?.palette?.infuuse?.blue500,
							textJustify: 'inter-word',
							wordBreak: 'keep-all',
						}}
					>
						Send Video Call Link
					</Typography>

					<Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
						<CloseIconBox />
					</Box>
				</Stack>

				<Stack>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						{room === null ? (
							<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
								<Button
									sx={{ color: theme?.palette?.infuuse?.green300, mb: 2 }}
									onClick={linkGeneration}
								>
									Generate Video Link
								</Button>
							</Stack>
						) : (
							<Stack>
								<CustomDescription
									name="note"
									fullWidth
									rows={5}
									multiline
									placeholder="Write a note"
								/>
								<Box display="flex" alignItems="center" justifyContent="space-between">
									<Typography fontSize="16px" color="#415070">
										Direct Link
									</Typography>

									<Box
										onClick={() => {
											copy(url);

											enqueueSnackbar('Copied', { variant: 'success' });
										}}
										sx={{ cursor: 'pointer' }}
									>
										<ContentCopyIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
									</Box>
								</Box>
								<Box
									border="1px solid #76B7F9"
									padding="10px"
									position="relative"
									borderRadius="12px"
									overflow="auto"
									marginTop="7px"
								>
									<Typography
										fontSize="14px"
										color="#676372"
										component="pre"
										sx={{ whiteSpace: 'pre-wrap' }}
										maxWidth="90%"
									>
										{url}
									</Typography>
								</Box>

								<Stack mt={2}>
									<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
										Send
									</NextButton>
								</Stack>
							</Stack>
						)}
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AddTwilioVideoCall;

// -------------------------------schema
const noteSchema = Yup.object().shape({
	note: Yup.string().notRequired(),
});

export const CustomDescription = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '150px',

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
