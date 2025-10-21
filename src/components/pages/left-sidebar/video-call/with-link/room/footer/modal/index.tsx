import { useRouter } from 'next/router';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import CloseIconBox from '@/assets/close-icon-box';
import copy from 'clipboard-copy';
import { enqueueSnackbar } from 'notistack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props {
	handleClose: () => void;
}

const InviteModal = ({ handleClose }: Props) => {
	const theme = useTheme();

	const router = useRouter();
	const code = router?.query?.code;
	const Link = `${window.location.protocol}//${window.location.host}/video-call?code=${code}`;

	return (
		<Stack
			width={'500px'}
			height={'100%'}
			position={'relative'}
			bgcolor={theme?.palette?.common?.white}
			boxShadow={4}
			borderRadius={2}
			p={2}
		>
			<Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
				<Typography color={theme?.palette?.infuuse?.blue100} fontWeight={'bold'} fontSize={'16px'}>
					Video Call Link
				</Typography>

				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					sx={{ cursor: 'pointer' }}
					onClick={handleClose}
				>
					<CloseIconBox />
				</Box>
			</Stack>

			<Stack width={'100%'}>
				<Typography color={theme?.palette?.infuuse?.blue500} mb={1}>
					Your meeting’s ready
				</Typography>

				<Typography color={theme?.palette?.infuuse?.blue500} mb={2}>
					Or share this meeting link with others you want in the meeting
				</Typography>

				<Stack width={'100%'}>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography fontSize="16px" color="#415070">
							Direct Link
						</Typography>

						<Box
							onClick={() => {
								copy(Link);

								enqueueSnackbar('Copied', { variant: 'success' });
							}}
							sx={{ cursor: 'pointer' }}
						>
							<ContentCopyIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
						</Box>
					</Box>

					<Box border="1px solid #76B7F9" borderRadius="12px" overflow="auto" p={1}>
						<Typography fontSize="14px" color="#676372" sx={{ whiteSpace: 'pre-wrap' }}>
							{Link}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default InviteModal;
