import Image from '@/components/atoms/Image';
import ModalContainer from '@/components/atoms/Modal';
import { Close } from '@mui/icons-material';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

const NoResponsive = () => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [modalCounter, setModalCounter] = React.useState(0);

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (number: number) => {
		setModalCounter(number);
		handleOpen();
	};
	return (
		<Stack
			py={'25px'}
			overflow={'auto'}
			minHeight={'100vh'}
			maxHeight={'100vh'}
			height={'100%'}
			justifyContent={'center'}
			alignItems={'center'}
			bgcolor={'#0a4e66'}
		>
			<Stack mb={'25px'} justifyContent={'center'} alignItems={'center'}>
				<Image
					src="/images/mobile-error-risponsive.svg"
					style={{
						width: '200px',
						height: '200px',
						objectFit: 'contain',
					}}
				/>
			</Stack>
			<Stack
				width={'90vw'}
				bgcolor={'#EDEFF2'}
				height={'100%'}
				borderRadius={'8px'}
				maxHeight={'400px'}
				p={'24px'}
			>
				<Stack>
					<Typography color={'#094B63'} fontSize={'16px'} fontStyle={'italic'}>
						Sorry!
					</Typography>
					<Stack alignItems={'center'} mt={'10px'} mb={'24px'}>
						<Typography
							color={'#415070'}
							fontSize={'35px'}
							lineHeight={'45px'}
							textAlign={'center'}
							maxWidth={'281px'}
							align="center"
						>
							InFUUSE is not designed for phones yet{' '}
						</Typography>
					</Stack>

					<Typography color={'#415070'} fontSize={'16px'} align="center" mb={'24px'}>
						Please click on "Request Desktop Website" in your browser's setting.{' '}
					</Typography>
					<Typography color={'#0A4E66'} fontSize={'14px'} align="center" mb={'24px'} fontWeight={'bold'}>
						Learn how to do that on:
					</Typography>
					<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
						<Box sx={{ cursor: 'pointer', marginRight: '32px' }} onClick={() => handelModal(1)}>
							<Image src="/images/chrome-icon.svg" />
						</Box>
						<Box sx={{ cursor: 'pointer' }} onClick={() => handelModal(2)}>
							<Image src="/images/safari-icon.svg" />
						</Box>
					</Stack>
				</Stack>
			</Stack>

			<ModalContainer open={open} handleClose={handleClose}>
				<Stack
					bgcolor={modalCounter === 1 ? '#121212' : '#fff'}
					alignItems={'center'}
					sx={{
						width: isMobile ? '67vw' : '75vw',
						height: '80vh',
						borderRadius: '8px',
						maxWidth: '300px',
					}}
				>
					<Stack width={'100%'} alignItems={'end'} p={'4px 8px'} borderRadius="8px 8px 0 0">
						<Box sx={{ cursor: 'pointer' }} onClick={handleClose}>
							<Close sx={{ color: modalCounter === 1 ? '#fff' : '#000' }} />
						</Box>
					</Stack>

					{modalCounter == 1 ? (
						<video
							controls
							autoPlay
							muted
							src={'/videos/IMG_0051.MP4'}
							style={{ width: '100%', height: '90%', maxWidth: '300px', maxHeight: '692px' }}
						/>
					) : (
						<video
							controls
							autoPlay
							muted
							src={'/videos/video_2023-11-30_01-06-58.mp4'}
							style={{ width: '100%', height: '90%', maxWidth: '300px', maxHeight: '692px' }}
						/>
					)}
				</Stack>
			</ModalContainer>
		</Stack>
	);
};

export default NoResponsive;
