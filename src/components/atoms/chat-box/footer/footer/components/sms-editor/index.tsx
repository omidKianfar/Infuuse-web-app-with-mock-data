import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Box, IconButton, InputAdornment, Stack, styled } from '@mui/material';
import EmojiHappyIcon from '@/assets/emoji-happy-icon';

interface Props {
	editorOutput: string;
	setEditorOutput: React.Dispatch<React.SetStateAction<string>>;
}

const SMSEditor = ({ editorOutput, setEditorOutput }: Props) => {
	const textFieldRef = useRef(null);

	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleEmojiSelect = (emoji) => {
		const cursorPosition = textFieldRef.current.selectionStart;
		const textBeforeCursor = editorOutput.substring(0, cursorPosition);
		const textAfterCursor = editorOutput.substring(cursorPosition);

		const newValue = textBeforeCursor + emoji.native + textAfterCursor;
		setEditorOutput(newValue);

		setTimeout(() => {
			textFieldRef.current.setSelectionRange(
				cursorPosition + emoji.native.length,
				cursorPosition + emoji.native.length
			);
			textFieldRef.current.focus();
		}, 0);
		setShowEmojiPicker(false);
	};

	return (
		<Stack position={'relative'}>
			<CustomTextField
				inputRef={textFieldRef}
				value={editorOutput}
				onChange={(e) => setEditorOutput(e.target.value)}
				variant="outlined"
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								edge="end"
								onClick={() => setShowEmojiPicker(!showEmojiPicker)}
								sx={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'center',
									pt: '2px',
								}}
							>
								<EmojiHappyIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			{showEmojiPicker && (
				<Box position={'absolute'} bottom={'50px'} right={0}>
					<Picker data={data} onEmojiSelect={(emoji) => handleEmojiSelect(emoji)} emojiSize={20} />
				</Box>
			)}
		</Stack>
	);
};

export default SMSEditor;

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
			border: `2px solid ${theme?.palette?.infuuse?.blue100}`,

			borderRadius: '8px',
		},
		'&.Mui-focused fieldset': {
			backgroundColor: theme?.palette?.common?.gray400,
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.blue100}`,

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
