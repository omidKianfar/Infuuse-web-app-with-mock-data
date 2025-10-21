import { Box, Divider, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NextButton } from '@/components/atoms/Button';
import SendIcon from '@/assets/send-icon';
import UploadMenu from '@/components/atoms/upload-menu';
import VoiceChat from '@/components/atoms/voice-menu';
import { AttachmentType, useLiveChat_SendMessageByContactMutation } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useSnapshot } from 'valtio';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import TextEditor from './text';
import resetStore from '@/store/reset.store';
import settingLiveChatStore from '@/store/setting-live-chat.store';
import ShowUploadedBox from '@/components/atoms/chat-box/footer/footer/components/show-uploaded-box';
import { queryClient } from 'pages/_app';
import SlateEditor from '@/components/atoms/slatejs-editor';

interface Props {
	setConversationChat: React.Dispatch<React.SetStateAction<never[]>>;
}

const Footer = () => {
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------state management
	const { conversationId } = useSnapshot(settingLiveChatStore);

	// -------------------------------state
	const [editorOutput, setEditorOutput] = useState<string>('');

	const [showMenu, setShowMenu] = useState<boolean>(false);

	const [IsUploading, setIsUploading] = useState<boolean>(false);

	const [ProgressBar, setProgressbar] = useState(0);

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

	// -------------------------------query
	const { mutate: ContactSendMessage } = useLiveChat_SendMessageByContactMutation();

	// -------------------------------functions
	// send
	const sendHandler = () => {
		if (uploadedFile?.type === 'text') {
			if (editorOutput != '' && editorOutput !== '<P ></P>' && editorOutput !== '<P ></P><P ></P>') {
				ContactSendMessage(
					{
						conversationId: Number(conversationId),
						input: {
							message: editorOutput,
							conversationAttachments: [],
						},
					},
					{
						onSuccess: (data) => {
							const { status } = responseDestructure(data);
							if (status.code == 1) {
								resetFields()
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
				ContactSendMessage(
					{
						conversationId: Number(conversationId),
						input: {
							message: '',
							conversationAttachments: [
								{ type: AttachmentType?.Voice, url: uploadedFile?.voiceUrl as string },
							],
						},
					},
					{
						onSuccess: (data) => {
							const { status } = responseDestructure(data);
							if (status.code == 1) {
								resetFields()
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
			ContactSendMessage(
				{
					conversationId: Number(conversationId),
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
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							resetFields()
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
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
		setProgressbar(0);
		reset();
		RecorderStore.mediaBlob = '';
		setShowMenu(false);
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.ctrlKey) {
				event.preventDefault(); // Prevent the default "Enter" key behavior
				sendHandler(); // Call the sendHandler function
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [editorOutput, uploadedFile]); // Dependencies ensure the latest state is used


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
				{uploadedFile?.type === 'voice' ? (
					<VoiceChat setUploadedFile={setUploadedFile} />
				) : uploadedFile?.type === 'text' ? (
					// -------------------------------text
					<SlateEditor editorOutput={editorOutput} setEditorOutput={setEditorOutput} />
				) : (
					<Stack>
						<ShowUploadedBox
							uploadedFile={uploadedFile}
							setUploadedFile={setUploadedFile}
							setProgressbar={setProgressbar}
						/>
						<Divider sx={{ mt: 1 }} />
					</Stack>
				)}
				<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mt={1}>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} position={'relative'}>
						{/* -------------------------------upload menu */}
						<UploadMenu
							setUploadedFile={setUploadedFile}
							showMenu={showMenu}
							setShowMenu={setShowMenu}
							setIsUploading={setIsUploading}
							setProgressbar={setProgressbar}
						/>
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

						<NextButton onClick={sendHandler} disabled={IsUploading} isLoading={IsUploading}>
							<SendIcon />
						</NextButton>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Footer;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
		borderRadius: '16px',
		width: '150px',
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
