import AddIcon from '@/assets/add-icon';
import { Box, useTheme } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideoIcon from '@/assets/video-icon';
import PictureIcon from '@/assets/picture-icon';
import FileAttachmentIcon from '@/assets/file-attachment-icon';
import useFileUpload from '@/hooks/useUploadFile';
import { getFullImageUrl } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import CloseIconBox from '@/assets/close-icon-box';
import { IconBox, MenuContainer } from './styles';
import { TypeContactNetwork } from '@/graphql/generated';

interface Props {
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	setUploadedFile: React.Dispatch<
		React.SetStateAction<{
			photoUrl: string;
			videoUrl: string;
			fileUrl: string;
			voiceUrl: string;
			type: string;
		}>
	>;
	setIsUploading?: React.Dispatch<React.SetStateAction<boolean>>;
	setProgressbar: React.Dispatch<React.SetStateAction<number>>;
	SendVia: {
		type: string;
		id: string | number;
		value: string;
	};
}

const UploadMenu = ({
	showMenu,
	setShowMenu,
	setUploadedFile,
	setIsUploading,
	setProgressbar,
	SendVia,
}: Partial<Props>) => {
	const theme = useTheme();

	const inputPhotoRef = useRef<HTMLInputElement>(null);
	const inputVideoRef = useRef<HTMLInputElement>(null);
	const inputFilesRef = useRef<HTMLInputElement>(null);

	const { uploadFile, progress, reset, url, isUploading } = useFileUpload();

	const triggerInput = (ref: React.RefObject<HTMLInputElement>) => {
		ref.current?.click();
	};

	const handleUnsupportedFile = () => {
		enqueueSnackbar('Video and audio files are not supported', { variant: 'error' });
	};

	const handleVoice = () => {
		setUploadedFile?.({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'voice' });
		setShowMenu?.(false);
	};

	useEffect(() => {
		setIsUploading?.(isUploading && !url);
	}, [isUploading, url, setIsUploading]);

	useEffect(() => {
		setProgressbar?.(progress || 0);
	}, [progress, setProgressbar]);

	const UploadHandler = async (event: ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'file') => {
		const files = event.target.files;
		setShowMenu?.(false);
		if (!files?.length) return;

		const file = files[0];
		try {
			const res = await uploadFile(file);
			if (res?.url) {
				const uploadedUrl = getFullImageUrl(res.url);
				switch (type) {
					case 'image':
						setUploadedFile?.({ photoUrl: uploadedUrl ?? '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'photo' });
						break;
					case 'video':
						setUploadedFile?.({ photoUrl: '', videoUrl: uploadedUrl ?? '', fileUrl: '', voiceUrl: '', type: 'video' });
						break;
					case 'file':
						setUploadedFile?.({ photoUrl: '', videoUrl: '', fileUrl: uploadedUrl ?? '', voiceUrl: '', type: 'file' });
						break;
				}
				reset();
			}
		} catch (error) {
			enqueueSnackbar('Failed to upload file', { variant: 'error' });
		} finally {
			event.target.value = '';
		}
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				mr={2}
				sx={{ cursor: 'pointer' }}
				onClick={() => setShowMenu?.(!showMenu)}
			>
				{showMenu ? (
					<CloseIconBox width="32px" height="32px" fill={theme.palette.infuuse.blue100} />
				) : (
					<AddIcon width="32px" height="32px" />
				)}
			</Box>

			{showMenu && (
				<MenuContainer>
					{/* Voice */}
					<IconBox mb={1} onClick={SendVia?.type === TypeContactNetwork?.PhoneNumber ? handleUnsupportedFile : handleVoice}>
						<MicIcon sx={{ fontSize: '32px', color: theme.palette.infuuse.blueDark200 }} />
					</IconBox>

					{/* Video */}
					<IconBox mb={1}>
						<Box
							onClick={
								SendVia?.type === TypeContactNetwork?.PhoneNumber
									? handleUnsupportedFile
									: () => triggerInput(inputVideoRef)
							}
						>
							<VideoIcon width="32px" height="32px" fill={theme.palette.infuuse.blueDark200} />
						</Box>
						<input type="file" hidden accept="video/*" onChange={(e) => UploadHandler(e, 'video')} ref={inputVideoRef} />
					</IconBox>

					{/* Photo */}
					<IconBox mb={1}>
						<Box onClick={() => triggerInput(inputPhotoRef)}>
							<PictureIcon fill={theme.palette.infuuse.blueDark200} />
						</Box>
						<input type="file" hidden accept="image/*" onChange={(e) => UploadHandler(e, 'image')} ref={inputPhotoRef} />
					</IconBox>

					{/* Files */}
					<IconBox>
						<Box
							onClick={
								SendVia?.type === TypeContactNetwork?.PhoneNumber
									? handleUnsupportedFile
									: () => triggerInput(inputFilesRef)
							}
						>
							<FileAttachmentIcon width="20px" height="20px" fill={theme.palette.infuuse.blueDark200} />
						</Box>
						<input type="file" hidden accept="*" onChange={(e) => UploadHandler(e, 'file')} ref={inputFilesRef} />
					</IconBox>
				</MenuContainer>
			)}
		</>
	);
};

export default React.memo(UploadMenu);
