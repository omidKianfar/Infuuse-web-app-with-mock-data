import SendIcon from '@/assets/send-icon';
import { NextButton } from '@/components/atoms/Button';
import TemplatesSearch from '@/components/atoms/search/template-search';
import UploadMenu from '@/components/atoms/upload-menu';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import {
	AttachmentType,
	ConversationMessage,
	SortEnumType,
	TypeContactNetwork,
	useContactNetwork_GetListByContactIdQuery,
	useConversationMessage_SendMessageToGmailMutation,
	useLiveChat_SendMessageByMemberMutation,
	useTwilio_SendSmsMutation,
} from '@/graphql/generated';
import chatBoxTypeNetworkStore from '@/store/chat-box-type-network.store';
import replyStore from '@/store/reply.store';
import resetStore from '@/store/reset.store';
import { responseDestructure } from '@/utils';
import { Box, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import GmailComponent from './components/gmail';
import LiveChatComponent from './components/live-chat';
import SMSComponent from './components/sms';

interface Props {
	lastMessageSubscription: ConversationMessage;
}

const FooterInbox = ({ lastMessageSubscription }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;
	const ContactId = router?.query?.contactId;

	// -------------------------------state
	const [editorOutput, setEditorOutput] = useState<string>('');
	const [EmailTitle, setEmailTitle] = useState<string>('');
	const [SMSeditorOutput, setSMSEditorOutput] = useState<string>('');
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [TemplateMenu, setTemplateMenu] = useState<boolean>(false);
	const [IsUploading, setIsUploading] = useState<boolean>(false);
	const [ProgressBar, setProgressbar] = useState(0);
	const [choosenTemplateContent, setChoosenTemplateContent] = useState<string | null>(null);
	const [editorKey, setEditorKey] = useState(0);
	const [SendVia, setSendVia] = useState({
		type: lastMessageSubscription?.contactNetwork?.typeContactNetwork || 'Live Chat',
		id: lastMessageSubscription?.contactNetwork?.id || 'Live Chat',
		value: lastMessageSubscription?.contactNetwork?.value || 'Live Chat',
	});
	const [uploadedFile, setUploadedFile] = useState({
		photoUrl: '',
		videoUrl: '',
		fileUrl: '',
		voiceUrl: '',
		type: 'text',
	});

	// -------------------------------state management
	const { mediaBlob } = useSnapshot(RecorderStore);

	const { reset } = useSnapshot(resetStore);
	const { netWorkType } = useSnapshot(chatBoxTypeNetworkStore);
	const { replyId, replyMessage } = useSnapshot(replyStore);

	// ------------------------------functions
	useEffect(() => {
		if (choosenTemplateContent) {
			setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
			setEditorOutput(choosenTemplateContent);
			setEditorKey((prevKey) => prevKey + 1);
		}
	}, [choosenTemplateContent]);

	// -------------------------------query
	const { mutate: MemberSendMessage, isLoading: SendMessageMemberLoading } =
		useLiveChat_SendMessageByMemberMutation();
	const { mutate: sendSMS, isLoading: SendSMSLoading } = useTwilio_SendSmsMutation();
	const { mutate: sendGmailMessage, isLoading: sendGmailLoading } =
		useConversationMessage_SendMessageToGmailMutation();

	// -------------------------------functions
	// send
	const sendHandler = () => {
		if (!Boolean(SendVia?.id)) {
			enqueueSnackbar('Please select the `Send Via` field', { variant: 'error' });
			return;
		}

		if (SendVia?.type === TypeContactNetwork?.PhoneNumber) {
			if (uploadedFile?.type === 'text') {
				if (SMSeditorOutput !== '') {
					sendSMS(
						{
							conversationId: Number(ConversationId),
							input: {
								contactNetworkId: Number(SendVia?.id),
								to: SendVia?.value,
								message: SMSeditorOutput,
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
							message: SMSeditorOutput,
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
		} else if (SendVia?.type === TypeContactNetwork?.Email) {
			sendGmailMessage(
				{
					input: {
						...(replyId
							? { isReplyTo: replyId, summaryReplyMessage: replyMessage }
							: { subject: EmailTitle }),
						conversationId: Number(ConversationId),
						contactNetworkId: Number(SendVia?.id),
						body: editorOutput,
						attachmentUrls:
							uploadedFile?.photoUrl !== ''
								? [uploadedFile?.photoUrl]
								: uploadedFile?.videoUrl !== ''
									? [uploadedFile?.videoUrl]
									: uploadedFile?.fileUrl !== ''
										? [uploadedFile?.fileUrl]
										: uploadedFile?.voiceUrl !== ''
											? [uploadedFile?.voiceUrl]
											: null,
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
			if (uploadedFile?.type === 'text') {
				if (editorOutput !== '' && editorOutput !== '<P ></P>' && editorOutput !== '<P ></P><P ></P>') {
					MemberSendMessage(
						{
							conversationId: Number(ConversationId),
							input: {
								message: editorOutput,
								conversationAttachments: [],
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
			} else if (uploadedFile?.type === 'voice') {
				if (uploadedFile?.voiceUrl !== '') {
					MemberSendMessage(
						{
							conversationId: Number(ConversationId),
							input: {
								message: '',
								conversationAttachments: [
									{ type: AttachmentType?.Voice, url: uploadedFile?.voiceUrl as string },
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
				} else {
					enqueueSnackbar('Please wait a second to load voice and try again', { variant: 'error' });
				}
			} else {
				MemberSendMessage(
					{
						conversationId: Number(ConversationId),
						input: {
							message: '',
							conversationAttachments: [
								uploadedFile?.photoUrl !== ''
									? { type: AttachmentType?.Image, url: uploadedFile?.photoUrl as string }
									: uploadedFile?.videoUrl !== ''
										? { type: AttachmentType?.Video, url: uploadedFile?.videoUrl as string }
										: uploadedFile?.fileUrl !== ''
											? { type: AttachmentType?.File, url: uploadedFile?.fileUrl as string }
											: { type: AttachmentType?.Voice, url: uploadedFile?.voiceUrl as string },
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
		}
	};

	// -----------------------------------------query
	// contact networks
	const Network = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				neq: TypeContactNetwork?.Address,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const NetworkData = Network?.data?.contactNetwork_getListByContactId?.result;

	// -----------------------------------------functions
	// refetch queries
	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId']);
		await queryClient.invalidateQueries(['conversation_getList']);
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	};

	// reset fields
	const resetFields = () => {
		setEditorOutput('');
		setSMSEditorOutput('');
		setEmailTitle('');
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

	// press enter
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === 'Enter' &&
				!event.ctrlKey &&
				(!SendMessageMemberLoading || !SendSMSLoading || sendGmailLoading)
			) {
				event.preventDefault();
				sendHandler();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [editorOutput, SMSeditorOutput, uploadedFile, SendVia]);

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
				{SendVia?.type === TypeContactNetwork?.PhoneNumber ? (
					<SMSComponent
						uploadedFile={uploadedFile}
						setUploadedFile={setUploadedFile}
						setProgressbar={setProgressbar}
						SMSeditorOutput={SMSeditorOutput}
						setSMSEditorOutput={setSMSEditorOutput}
					/>
				) : SendVia?.type === TypeContactNetwork?.Email || replyId ? (
					<GmailComponent
						uploadedFile={uploadedFile}
						setUploadedFile={setUploadedFile}
						editorOutput={editorOutput}
						setEditorOutput={setEditorOutput}
						editorKey={editorKey}
						setProgressbar={setProgressbar}
						EmailTitle={EmailTitle}
						setEmailTitle={setEmailTitle}
					/>
				) : (
					<LiveChatComponent
						uploadedFile={uploadedFile}
						setUploadedFile={setUploadedFile}
						editorOutput={editorOutput}
						setEditorOutput={setEditorOutput}
						editorKey={editorKey}
						setProgressbar={setProgressbar}
					/>
				)}

				<Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={1}>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
						{/* -------------------------------upload menu */}
						<UploadMenu
							setUploadedFile={setUploadedFile}
							showMenu={showMenu}
							setShowMenu={setShowMenu}
							setIsUploading={setIsUploading}
							setProgressbar={setProgressbar}
							SendVia={SendVia}
						/>

						{/* -------------------------------send via */}
						{router?.pathname.includes('inbox') && (
							<Box display={'flex'} justifyContent={'start'} alignItems={'center'} mr={4}>
								<Typography
									color={theme?.palette?.infuuse?.blue500}
									fontWeight={'bold'}
									sx={{ textWrap: 'nowrap' }}
								>
									Send Via
								</Typography>

								<CustomTextField value={SendVia?.value} select fullWidth>
									<MenuItem
										value={'Live Chat'}
										onClick={() => {
											setSendVia({
												type: 'Live Chat',
												id: 'Live Chat',
												value: 'Live Chat',
											});
											chatBoxTypeNetworkStore.netWorkType = 'Live Chat';
										}}
									>
										<Typography
											fontSize={'14px'}
											color={theme?.palette?.infuuse?.blueDark500}
											fontWeight={'bold'}
										>
											Live Chat
										</Typography>
									</MenuItem>

									{NetworkData?.items?.map((network) => (
										<MenuItem
											key={network?.value}
											value={network?.value}
											onClick={() => {
												setSendVia({
													type: network?.typeContactNetwork as TypeContactNetwork,
													id: network?.id as number,
													value: network?.value as string,
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
						)}

						{/* -------------------------------templates */}
						{SendVia?.type !== TypeContactNetwork?.PhoneNumber && (
							<Stack position={'relative'}>
								<Box
									display={'flex'}
									justifyContent={'start'}
									alignItems={'center'}
									onClick={() => setTemplateMenu(!TemplateMenu)}
									sx={{ cursor: 'pointer' }}
									mr={2}
								>
									<Typography
										color={theme?.palette?.infuuse?.blue500}
										fontWeight={'bold'}
										sx={{ textWrap: 'nowrap' }}
									>
										Templates
									</Typography>
								</Box>

								{TemplateMenu && (
									<Box
										position={'absolute'}
										left={'-8px'}
										bottom={'36px'}
										zIndex={10000}
										width={'250px'}
										boxShadow={4}
										borderRadius={4}
									>
										<TemplatesSearch
											setChoosenTemplateContent={setChoosenTemplateContent}
											setTemplateMenu={setTemplateMenu}
										/>
									</Box>
								)}
							</Stack>
						)}
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
							disabled={IsUploading || SendMessageMemberLoading || SendSMSLoading || sendGmailLoading}
							isLoading={IsUploading || SendMessageMemberLoading || SendSMSLoading || sendGmailLoading}
						>
							<SendIcon />
						</NextButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FooterInbox;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
		borderRadius: '16px',
		width: '250px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,

			// borderRadius: "16px",
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
