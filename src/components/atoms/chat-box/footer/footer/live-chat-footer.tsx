import { Box, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import SendIcon from '@/assets/send-icon';
import UploadMenu from '@/components/atoms/upload-menu';
import { AttachmentType, useLiveChat_SendMessageByMemberMutation } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useSnapshot } from 'valtio';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import TemplatesSearch from '@/components/atoms/search/template-search';
import resetStore from '@/store/reset.store';
import LiveChatComponent from './components/live-chat';
import { queryClient } from 'pages/_app';

const LiveChatFooter = () => {
	const theme = useTheme();
	const router = useRouter();

	const ConversationId = router?.query?.conversationId;

	const [editorOutput, setEditorOutput] = useState<string>('');
	const [showMenu, setShowMenu] = useState<boolean>(false);

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

	useEffect(() => {
		if (choosenTemplateContent) {
			setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
			setEditorOutput(choosenTemplateContent);
			setEditorKey((prevKey) => prevKey + 1);
		}
	}, [choosenTemplateContent]);

	const { mutate: MemberSendMessage, isLoading: SendMessageMemberLoading } = useLiveChat_SendMessageByMemberMutation();

	const sendHandler = () => {
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
								await resetFields()
								await refetchQueries()
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
								await resetFields()
								await refetchQueries()
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
							await resetFields()
							await refetchQueries()
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};


	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getList'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

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
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.ctrlKey && !SendMessageMemberLoading) {
				event.preventDefault();
				sendHandler();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [editorOutput, uploadedFile]);

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
				<LiveChatComponent
					uploadedFile={uploadedFile}
					setUploadedFile={setUploadedFile}
					editorOutput={editorOutput}
					setEditorOutput={setEditorOutput}
					editorKey={editorKey}
					setProgressbar={setProgressbar} />

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

						<NextButton onClick={sendHandler}
							disabled={IsUploading || SendMessageMemberLoading}
							isLoading={IsUploading || SendMessageMemberLoading}>
							<SendIcon />
						</NextButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LiveChatFooter;

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
