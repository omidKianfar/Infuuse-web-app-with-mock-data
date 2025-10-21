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
	SendVia?: {
		type: string;
		id: string | number;
		value: string;
	};
}

const UploadMenu = ({ showMenu, setShowMenu, setUploadedFile, setIsUploading, setProgressbar, SendVia }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------ref
	const inputPhotoRef = useRef<HTMLInputElement>(null);
	const inputVideoRef = useRef<HTMLInputElement>(null);
	const inputFilesRef = useRef<HTMLInputElement>(null);

	// ------------------------------- functions

	const voiceHandler = () => {
		setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'voice' });
		setShowMenu(false);
	};

	// useFileUpload hook
	const { uploadFile, progress, reset, url, isUploading } = useFileUpload();

	useEffect(() => {
		if (isUploading && !url) {
			setIsUploading(true);
		} else {
			setIsUploading(false);
		}
	}, [isUploading, url]);

	useEffect(() => {
		if (progress) {
			setProgressbar(progress);
		}
	}, [progress]);

	// upload handler
	const UploadHandler = async (event: ChangeEvent<HTMLInputElement>, type: string) => {
		const files = event.target.files;
		setShowMenu(false);
		if (!files?.length) return;

		try {
			const res = await uploadFile(files[0]);
			if (res?.url) {
				if (type === 'image') {
					setUploadedFile({
						photoUrl: getFullImageUrl(res.url) as string,
						videoUrl: '',
						fileUrl: '',
						voiceUrl: '',
						type: 'photo',
					});
				} else if (type === 'video') {
					setUploadedFile({
						photoUrl: '',
						videoUrl: getFullImageUrl(res.url) as string,
						fileUrl: '',
						voiceUrl: '',

						type: 'video',
					});
				} else {
					setUploadedFile({
						photoUrl: '',
						videoUrl: '',
						fileUrl: getFullImageUrl(res.url) as string,
						voiceUrl: '',
						type: 'file',
					});
				}
				reset();
				event.target.value = '';
			}
		} catch (error) {
			enqueueSnackbar('Failed upload file', { variant: 'error' });
		} finally {
			event.target.value = '';
		}
	};

	const handelStoper = () => {
		enqueueSnackbar('Video and audio files does not supported', { variant: 'error' });
	};

	return (
		<>
			<Box
				display={'flex'}
				justifyContent={'start'}
				alignItems={'center'}
				mr={2}
				sx={{ cursor: 'pointer' }}
				onClick={() => setShowMenu(!showMenu)}
			>
				{showMenu ? (
					<CloseIconBox width="32px" height="32px" fill={theme?.palette?.infuuse?.blue100} />
				) : (
					<AddIcon width="32px" height="32px" />
				)}
			</Box>
			{showMenu && (
				<MenuContainer>
					{/*  ------------------------------- voice */}

					<IconBox
						mb={1}
						onClick={SendVia?.type === TypeContactNetwork?.PhoneNumber ? handelStoper : voiceHandler}
					>
						<MicIcon
							sx={{
								fontSize: '32px',
								color: theme?.palette?.infuuse?.blueDark200,
							}}
						/>
					</IconBox>

					{/* ------------------------------- video */}
					<IconBox mb={'8px'}>
						<Box
							onClick={
								SendVia?.type === TypeContactNetwork?.PhoneNumber
									? handelStoper
									: () => inputVideoRef.current.click()
							}
						>
							<VideoIcon width="32px" height="32px" fill={theme?.palette?.infuuse?.blueDark200} />
						</Box>
						<input
							type="file"
							hidden
							accept="video/*"
							onChange={(event) => UploadHandler(event, 'video')}
							ref={inputVideoRef}
						/>
					</IconBox>

					{/* ------------------------------- photo */}
					<IconBox mb={'8px'}>
						<Box onClick={() => inputPhotoRef.current.click()}>
							<PictureIcon fill={theme?.palette?.infuuse?.blueDark200} />
						</Box>
						<input
							type="file"
							hidden
							accept="image/*"
							onChange={(event) => UploadHandler(event, 'image')}
							ref={inputPhotoRef}
						/>
					</IconBox>

					{/* ------------------------------- files */}
					<IconBox>
						<Box
							onClick={
								SendVia?.type === TypeContactNetwork?.PhoneNumber
									? () => {
											inputFilesRef.current.click();
											handelStoper();
									  }
									: () => {
											inputFilesRef.current.click();
									  }
							}
						>
							<FileAttachmentIcon
								width="20px"
								height="20px"
								fill={theme?.palette?.infuuse?.blueDark200}
							/>
						</Box>
						<input
							type="file"
							hidden
							accept="*"
							onChange={(event) => UploadHandler(event, 'file')}
							ref={inputFilesRef}
						/>
					</IconBox>
				</MenuContainer>
			)}
		</>
	);
};

export default UploadMenu;
