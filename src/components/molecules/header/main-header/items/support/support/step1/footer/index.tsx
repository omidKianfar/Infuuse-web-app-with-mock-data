import SendIcon from '@/assets/send-icon';
import { NextButton } from '@/components/atoms/Button';
import UploadMenu from '@/components/atoms/upload-menu';
import VoiceChat from '@/components/atoms/voice-menu';
import RecorderStore from '@/components/atoms/voice-menu/recorderStore';
import { AttachmentType, useSupportChat_AddSupportMessageMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Box, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import ShowUploadedBox from './show-uploaded-box';
import { queryClient } from 'pages/_app';

const Footer = () => {
	const theme = useTheme();

	const [value, setValue] = useState<string>('');
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [IsUploading, setIsUploading] = useState<boolean>(false);
	const [ProgressBar, setProgressbar] = useState<number>(0);

	const [uploadedFile, setUploadedFile] = useState({
		photoUrl: '',
		videoUrl: '',
		fileUrl: '',
		voiceUrl: '',
		type: 'text',
	});


	const { mediaBlob } = useSnapshot(RecorderStore);

	const { mutate: SupportMemberSendMessage, isLoading: sendSupportLoading } = useSupportChat_AddSupportMessageMutation();

	const sendHandler = () => {
		if (uploadedFile?.type === 'text') {
			if (value !== '') {
				SupportMemberSendMessage(
					{
						supportMessageInput: {
							message: value,
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
				SupportMemberSendMessage(
					{
						supportMessageInput: {
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
			SupportMemberSendMessage(
				{
					supportMessageInput: {
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
						const { status, result } = responseDestructure(data);
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

	// refetch queries
	const refetchQueries = async () => {
		await queryClient.invalidateQueries(['supportChat_getList'])
		await queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
		await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
	}

	// reset fields
	const resetFields = () => {
		setValue('');
		setUploadedFile({
			photoUrl: '',
			videoUrl: '',
			fileUrl: '',
			voiceUrl: '',
			type: 'text',
		});
		setProgressbar(0);
		RecorderStore.mediaBlob = '';
		setShowMenu(false);
	}

	// press enter
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.ctrlKey && !sendSupportLoading) {
				event.preventDefault(); 
				sendHandler(); 
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [value, uploadedFile]);

	return (
		<Stack width={'100%'} position={'absolute'} bottom={0} left={0} height={'70px'} p={1}>
			<Stack
				bgcolor={theme?.palette?.infuuse?.gray400}
				height={'60px'}
				borderRadius={2}
				px={1}
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				position={'relative'}
			>
				<Stack>
					{uploadedFile?.type === 'voice' ? (
						<Stack width={'300px'} pt={1}>
							<VoiceChat setUploadedFile={setUploadedFile} />
						</Stack>
					) : uploadedFile?.type === 'text' ? (
						<CustomTextField
							placeholder="Type A Message"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					) : <Stack position={'absolute'} bottom={'60px'} left={0}>
						<ShowUploadedBox
							uploadedFile={uploadedFile}
							setUploadedFile={setUploadedFile}
							setProgressbar={setProgressbar}
						/>
					</Stack>}
				</Stack>

				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					{uploadedFile?.type !== 'voice' && (
						<Box position={'relative'}>
							<UploadMenu
								setUploadedFile={setUploadedFile}
								showMenu={showMenu}
								setShowMenu={setShowMenu}
								setIsUploading={setIsUploading}
								setProgressbar={setProgressbar}
							/>
						</Box>
					)}

					<Stack position={'relative'}>
						<Box position={'absolute'} top={'-32px'} right={0}>
							{ProgressBar >= 1 && ProgressBar < 100 && (
								<Box >
									<Typography
										sx={{ wordBreak: 'break-word', wordWrap: 'break-word', fontStyle: 'italic' }}
										color={theme?.palette?.infuuse?.gray500}
									>
										{`${ProgressBar}%`}
									</Typography>
								</Box>
							)}
						</Box>


						<NextButton onClick={sendHandler}
							disabled={IsUploading && sendSupportLoading}
							isLoading={IsUploading && sendSupportLoading}
							sx={{ height: '45px' }}>
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
		backgroundColor: theme?.palette?.infuuse?.gray400,
		borderRadius: '16px',
		height: '40px',
		width: '240px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
			height: '40px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
			height: '40px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray400,
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
