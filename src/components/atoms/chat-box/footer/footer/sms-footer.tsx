import SendIcon from '@/assets/send-icon';
import { NextButton } from '@/components/atoms/Button';
import UploadMenu from '@/components/atoms/upload-menu';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import {
	ConversationMessage,
	SortEnumType,
	TypeContactNetwork,
	useContactNetwork_GetListByContactIdQuery,
	useTwilio_SendSmsMutation,
} from '@/graphql/generated';
import chatBoxTypeNetworkStore from '@/store/chat-box-type-network.store';
import resetStore from '@/store/reset.store';
import { responseDestructure } from '@/utils';
import { Box, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import SMSComponent from './components/sms';
interface Props {
	lastMessageSubscription: ConversationMessage;
}

const SMSFooter = ({ lastMessageSubscription }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;
	const ContactId = router?.query?.contactId;

	const { netWorkType } = useSnapshot(chatBoxTypeNetworkStore);

	const Network = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const NetworkData = Network?.data?.contactNetwork_getListByContactId?.result;

	const [editorOutput, setEditorOutput] = useState<string>('');
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [SendVia, setSendVia] = useState({
		type: lastMessageSubscription?.contactNetwork?.typeContactNetwork || NetworkData?.items[0]?.typeContactNetwork,
		id: lastMessageSubscription?.contactNetwork?.id || NetworkData?.items[0]?.id,
		value: lastMessageSubscription?.contactNetwork?.value || NetworkData?.items[0]?.value,
	});

	const [IsUploading, setIsUploading] = useState<boolean>(false);
	const [ProgressBar, setProgressbar] = useState(0);

	const [uploadedFile, setUploadedFile] = useState({
		photoUrl: '',
		videoUrl: '',
		fileUrl: '',
		voiceUrl: '',
		type: 'text',
	});

	const { mediaBlob } = useSnapshot(RecorderStore);

	const { reset } = useSnapshot(resetStore);

	const { mutate: sendSMS, isLoading: SendSMSLoading } = useTwilio_SendSmsMutation();

	const sendHandler = () => {
		if (!Boolean(SendVia?.id)) {
			enqueueSnackbar('Please select the `Send Via` field', { variant: 'error' });
			return;
		}

		if (uploadedFile?.type === 'text') {
			if (editorOutput !== '') {
				sendSMS(
					{
						conversationId: Number(ConversationId),
						input: {
							contactNetworkId: Number(SendVia?.id),
							to: SendVia?.value,
							message: editorOutput,
							sendAsMMS: false,
						},
					},
					{
						onSuccess: async (data) => {
							const { status } = responseDestructure(data);
							if (status.code == 1) {
								await resetFields();
								await refetchQueries();
							} else {
								enqueueSnackbar(status.description, { variant: 'error' });
							}
						},
					}
				);
			} else {
				enqueueSnackbar('Please write a message', { variant: 'error' });
			}
		} else {
			sendSMS(
				{
					conversationId: Number(ConversationId),
					input: {
						contactNetworkId: Number(SendVia?.id),
						to: SendVia?.value,
						message: editorOutput,
						sendAsMMS: true,
						mediaUrls: [
							uploadedFile?.photoUrl !== ''
								? (uploadedFile?.photoUrl as string)
								: uploadedFile?.videoUrl !== ''
									? (uploadedFile?.videoUrl as string)
									: uploadedFile?.fileUrl !== ''
										? (uploadedFile?.fileUrl as string)
										: (uploadedFile?.voiceUrl as string),
						],
					},
				},
				{
					onSuccess: async (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							await resetFields();
							await refetchQueries();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};

	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId']);
		await queryClient.invalidateQueries(['conversation_getList']);
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	};

	const resetFields = () => {
		setEditorOutput('');
		setUploadedFile({
			photoUrl: '',
			videoUrl: '',
			fileUrl: '',
			voiceUrl: '',
			type: 'text',
		});
		reset();
		setProgressbar(0);
		RecorderStore.mediaBlob = '';
		setShowMenu(false);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.ctrlKey && !SendSMSLoading) {
				event.preventDefault();
				sendHandler();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [editorOutput, uploadedFile, SendVia]);

	return (
		<Stack position={'absolute'} left={'1%'} bottom={'8px'} width={'98%'}>
			<Stack
				bgcolor={theme?.palette?.infuuse?.gray100}
				width={'100%'}
				height={'100%'}
				borderRadius={2}
				p={1}
				border={`1px solid ${theme?.palette?.infuuse?.gray500}`}
			>
				<SMSComponent
					uploadedFile={uploadedFile}
					setUploadedFile={setUploadedFile}
					setProgressbar={setProgressbar}
					SMSeditorOutput={editorOutput}
					setSMSEditorOutput={setEditorOutput}
				/>

				<Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={1}>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
						{/* -------------------------------upload menu */}
						<UploadMenu
							setUploadedFile={setUploadedFile}
							showMenu={showMenu}
							setShowMenu={setShowMenu}
							setIsUploading={setIsUploading}
							setProgressbar={setProgressbar}
						/>

						{/* -------------------------------send via */}
						<Box display={'flex'} justifyContent={'start'} alignItems={'center'} mr={4}>
							<Typography
								color={theme?.palette?.infuuse?.blue500}
								fontWeight={'bold'}
								sx={{ textWrap: 'nowrap' }}
							>
								Send Via
							</Typography>

							<CustomTextField value={SendVia?.value} select fullWidth>
								{NetworkData?.items?.map((network) => (
									<MenuItem
										key={network?.value}
										value={network?.value}
										onClick={() => {
											setSendVia({
												type: network?.typeContactNetwork,
												id: network?.id,
												value: network?.value,
											});
											chatBoxTypeNetworkStore.netWorkType =
												network?.typeContactNetwork as TypeContactNetwork;
											chatBoxTypeNetworkStore.SendViaId = network?.id as number;
											chatBoxTypeNetworkStore.SendViaTo = network?.value as string;
										}}
									>
										<Typography
											fontSize={'14px'}
											color={theme?.palette?.infuuse?.blueDark500}
											fontWeight={'bold'}
										>
											{network?.value}
										</Typography>
									</MenuItem>
								))}
							</CustomTextField>
						</Box>
					</Stack>

					{/* ------------------------------- send button */}
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						{ProgressBar >= 1 && ProgressBar < 100 && (
							<Box mr={2}>
								<Typography
									sx={{ wordBreak: 'break-word', wordWrap: 'break-word', fontStyle: 'italic' }}
									color={theme?.palette?.infuuse?.gray500}
								>
									{`${ProgressBar}%`}
								</Typography>
							</Box>
						)}

						<NextButton
							onClick={sendHandler}
							disabled={IsUploading || SendSMSLoading}
							isLoading={IsUploading || SendSMSLoading}
						>
							<SendIcon />
						</NextButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SMSFooter;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
		borderRadius: '16px',
		width: '250px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,

		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,

		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));
