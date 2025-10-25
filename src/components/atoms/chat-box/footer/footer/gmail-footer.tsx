import { Box, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import SendIcon from '@/assets/send-icon';
import UploadMenu from '@/components/atoms/upload-menu';
import {
	ContactNetwork,
	ConversationMessage,
	TypeContactNetwork,
	useConversationMessage_SendMessageToGmailMutation,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useSnapshot } from 'valtio';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import TemplatesSearch from '@/components/atoms/search/template-search';
import resetStore from '@/store/reset.store';
import chatBoxTypeNetworkStore from '@/store/chat-box-type-network.store';
import GmailComponent from './components/gmail';
import { queryClient } from 'pages/_app';
import replyStore from '@/store/reply.store';
interface Props {
	lastMessageSubscription: ConversationMessage;
	Networks: ContactNetwork[];
}

const GmailFooter = ({ lastMessageSubscription, Networks }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;

	const [editorOutput, setEditorOutput] = useState<string>('');
	const [EmailTitle, setEmailTitle] = useState<string>('');
	const [SMSeditorOutput, setSMSEditorOutput] = useState<string>('');
	const [showMenu, setShowMenu] = useState<boolean>(false);
	// const [SendVia, setSendVia] = useState({
	// 	type: lastMessageSubscription?.contactNetwork?.typeContactNetwork,
	// 	id: lastMessageSubscription?.contactNetwork?.id,
	// 	value: lastMessageSubscription?.contactNetwork?.value,
	// });
	const [SendVia, setSendVia] = useState({
		type: Networks?.[0]?.typeContactNetwork,
		id: Networks?.[0]?.id,
		value: Networks?.[0]?.value,
	});
	const [TemplateMenu, setTemplateMenu] = useState<boolean>(false);
	const [IsUploading, setIsUploading] = useState<boolean>(false);
	const [ProgressBar, setProgressbar] = useState(0);

	const [choosenTemplateContent, setChoosenTemplateContent] = useState<string | null>(null);
	const [editorKey, setEditorKey] = useState(0);

	const [uploadedFile, setUploadedFile] = useState({
		photoUrl: '',
		videoUrl: '',
		fileUrl: '',
		voiceUrl: '',
		type: 'text',
	});

	const { mediaBlob } = useSnapshot(RecorderStore);

	const { reset } = useSnapshot(resetStore);
	const { netWorkType } = useSnapshot(chatBoxTypeNetworkStore);
	const { replyId, replyMessage } = useSnapshot(replyStore);

	useEffect(() => {
		if (choosenTemplateContent) {
			setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
			setEditorOutput(choosenTemplateContent);
			setEditorKey((prevKey) => prevKey + 1);
		}
	}, [choosenTemplateContent]);

	const { mutate: sendGmailMessage, isLoading: sendGmailLoading } = useConversationMessage_SendMessageToGmailMutation();

	const sendHandler = () => {
		if (!Boolean(SendVia?.id)) {
			enqueueSnackbar('Please select the `Send Via` field', { variant: 'error' });
			return;
		}

		sendGmailMessage(
			{
				input: {
					...(replyId ? { isReplyTo: replyId, summaryReplyMessage: replyMessage } : { subject: EmailTitle }),
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
						replyStore.replyId = 0;
						await resetFields();
						await refetchQueries()
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.ctrlKey && !sendGmailLoading) {
				event.preventDefault(); 
				sendHandler();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [editorOutput, SMSeditorOutput, uploadedFile, SendVia]); // Dependencies ensure the latest state is used

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
						<Box display={'flex'} justifyContent={'start'} alignItems={'center'} mr={4}>
							<Typography
								color={theme?.palette?.infuuse?.blue500}
								fontWeight={'bold'}
								sx={{ textWrap: 'nowrap' }}
							>
								Send Via
							</Typography>

							{Networks?.length > 0 && (
								<CustomTextField value={SendVia?.value} select fullWidth>
									{Networks?.map((network, index) => (
										<MenuItem
											selected={index === 0}
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
							)}
						</Box>

						{/* -------------------------------templates */}
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

						<NextButton onClick={sendHandler} disabled={IsUploading || sendGmailLoading} isLoading={IsUploading || sendGmailLoading}>
							<SendIcon />
						</NextButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default GmailFooter;

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
