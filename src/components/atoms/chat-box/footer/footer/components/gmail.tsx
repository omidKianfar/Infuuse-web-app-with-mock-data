import { Divider, IconButton, Stack, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import VoiceChat from '@/components/atoms/voice-menu';
import SlateEditor from '@/components/atoms/slatejs-editor';
import ShowUploadedBox from './show-uploaded-box';
import replyStore from '@/store/reply.store';
import { useSnapshot } from 'valtio';
import { Close } from '@mui/icons-material';

interface Props {
	uploadedFile: {
		photoUrl: string;
		videoUrl: string;
		fileUrl: string;
		voiceUrl: string;
		type: string;
	};
	setUploadedFile: React.Dispatch<
		React.SetStateAction<{
			photoUrl: string;
			videoUrl: string;
			fileUrl: string;
			voiceUrl: string;
			type: string;
		}>
	>;
	editorOutput: string;
	setEditorOutput: React.Dispatch<React.SetStateAction<string>>;
	editorKey: number;
	setProgressbar: React.Dispatch<React.SetStateAction<number>>;
	EmailTitle: string;
	setEmailTitle: React.Dispatch<React.SetStateAction<string>>;
}

const GmailComponent = ({
	uploadedFile,
	setUploadedFile,
	editorOutput,
	setEditorOutput,
	editorKey,
	setProgressbar,
	EmailTitle,
	setEmailTitle,
}: Props) => {
	const { replyId, replyMessage } = useSnapshot(replyStore);
	const onCloseReply = () => (replyStore.replyId = 0);

	return (
		<>
			{uploadedFile?.type === 'voice' ? (
				<VoiceChat setUploadedFile={setUploadedFile} />
			) : (

				<Stack>
					{uploadedFile?.type === 'photo' ||
					uploadedFile?.type === 'video' ||
					uploadedFile?.type === 'file' ? (
						<Stack mb={1}>
							<ShowUploadedBox
								uploadedFile={uploadedFile}
								setUploadedFile={setUploadedFile}
								setProgressbar={setProgressbar}
							/>
						</Stack>
					) : null}

					<Stack mb={1}>
						{replyId ? (
							<Stack
								direction="row"
								p="0.5rem 1rem"
								borderRadius="1rem"
								alignItems="center"
								gap="0.5rem"
								sx={{ border: (theme) => `1px solid ${theme.palette?.infuuse?.blueDark100}` }}
							>
								<Typography minWidth={80}>Reply to :</Typography>
								<Typography
									height={40}
									overflow="hidden"
									dangerouslySetInnerHTML={{ __html: replyMessage }}
								/>
								<IconButton sx={{ marginLeft: 'auto' }} onClick={onCloseReply}>
									<Close color="error" />
								</IconButton>
							</Stack>
						) : (
							<CustomTextField
								placeholder="Please write your title"
								value={EmailTitle}
								onChange={(e) => setEmailTitle(e.target.value)}
								variant="outlined"
								fullWidth
							/>
						)}
					</Stack>

					<SlateEditor editorOutput={editorOutput} setEditorOutput={setEditorOutput} editorKey={editorKey} />
				</Stack>
			)}
		</>
	);
};

export default GmailComponent;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.gray400,
		borderRadius: '8px',
		height: '48px',
		width: '100%',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
			borderRadius: '8px',
		},
		'& fieldset': {
			backgroundColor: theme?.palette?.common?.gray400,
			height: '48px',
			border: `1px solid ${theme?.palette?.infuuse?.blue100}`,

			borderRadius: '8px',
		},
		'&.Mui-focused fieldset': {
			backgroundColor: theme?.palette?.common?.gray400,
			height: '48px',
			border: `1px solid ${theme?.palette?.infuuse?.blue100}`,

			borderRadius: '8px',
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.blue100,
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
