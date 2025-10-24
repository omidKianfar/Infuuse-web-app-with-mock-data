import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import CloseIconBox from '@/assets/close-icon-box';
import Image from '@/components/atoms/Image';
import { getFullImageUrl } from '@/utils';
import { useRouter } from 'next/router';

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
	setProgressbar: React.Dispatch<React.SetStateAction<number>>
}

const ShowUploadedBox = ({ uploadedFile, setUploadedFile, setProgressbar }: Props) => {
	const theme = useTheme();

	const closeUploadHndeler = () => {
		setUploadedFile({ photoUrl: '', videoUrl: '', fileUrl: '', voiceUrl: '', type: 'text' });
		setProgressbar(0);
	};

	return (
		<Stack>
			<Stack
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				maxWidth={'250px'}
				borderRadius={2}
				p={1}
				border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
				position={'relative'}
				bgcolor={theme?.palette?.common?.white}
			>
				{uploadedFile?.fileUrl !== '' ? (
					<Stack justifyContent={'center'} alignItems={'center'}>
						<Box
							position={'absolute'}
							right={0}
							top={0}
							sx={{ cursor: 'pointer' }}
							onClick={closeUploadHndeler}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<CloseIconBox />
						</Box>
						<Box mb={1}>
							<InsertDriveFileIcon
								sx={{
									fontSize: '48px',
									color: theme?.palette?.infuuse?.blue100,
								}}
							/>
						</Box>

						<Typography sx={{ wordBreak: 'break-word', wordWrap: 'break-word' }}>
							{stringSlicer(uploadedFile?.fileUrl, 100)}
						</Typography>
					</Stack>
				) : uploadedFile?.photoUrl !== '' ? (
					<Stack justifyContent={'center'} alignItems={'center'}>
						<Box
							position={'absolute'}
							right={0}
							top={0}
							sx={{ cursor: 'pointer' }}
							onClick={closeUploadHndeler}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<CloseIconBox />
						</Box>
						<Image
							src={getFullImageUrl(uploadedFile?.photoUrl)}
							sx={{
								width: '100%',
								height: 'auto',
								borderRadius: '8px',
							}}
						/>
					</Stack>
				) : uploadedFile?.videoUrl !== '' ? (
					<Stack justifyContent={'center'} alignItems={'center'}>
						<Box
							position={'absolute'}
							right={0}
							top={0}
							sx={{ cursor: 'pointer' }}
							onClick={closeUploadHndeler}
							zIndex={100000}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<CloseIconBox />
						</Box>
						<video
							src={getFullImageUrl(uploadedFile?.videoUrl)}
							controls
							style={{
								width: '100%',
								height: 'auto',
								borderRadius: '8px',
							}}
						/>
					</Stack>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ShowUploadedBox;
