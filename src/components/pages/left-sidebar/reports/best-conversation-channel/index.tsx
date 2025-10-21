import { LinearProgress, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import MonthlyChart from './chart';

const BestConversationChannel = () => {
	const theme = useTheme();

	// -----------------------right sidebar state
	const [progress, setProgress] = React.useState({
		chat: 22,
		email: 29,
		phone: 80,
		sms: 4,
		facebook: 31,
		video: 18,
		whatsapp: 74,
		instagram: 63,
	});

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			p={2}
			direction={'row'}
			justifyContent={'space-between'}
			alignItems={'start'}
		>
			{/* --------------------------chart */}
			<Stack width={'55%'} height={'100%'} maxHeight={'calc(100vh - 200px)'}>
				<MonthlyChart />
			</Stack>

			{/* -----------------------right sidebar */}
			<Stack height={'100%'} width={'45%'} p={'62px 0 0 32px'}>
				<Stack
					bgcolor={theme?.palette?.common?.white}
					border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
					borderRadius={2}
					height={'100%'}
					maxHeight={'calc(100vh - 268px)'}
					overflow={'auto'}
					p={2}
				>
					<Stack mb={4}>
						<Typography fontSize={'18px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500}>
							Total Revenue
						</Typography>
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Chat
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.chat} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Email
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.email} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Phone
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.phone} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Sms
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.sms} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Facebook
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.facebook} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Video
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.video} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Whatsapp
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.whatsapp} />
					</Stack>

					<Stack mb={2}>
						<Typography mb={'4px'} color={theme?.palette?.infuuse?.blue500}>
							Instagram
						</Typography>
						<CustomLinearProgress variant="determinate" value={progress?.instagram} />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BestConversationChannel;

export const CustomLinearProgress = styled(LinearProgress)<{ value: number }>(({ theme, value }) => ({
	height: '8px',
	borderRadius: 4,
	backgroundColor: theme?.palette?.infuuse?.gray500,
	'& .MuiLinearProgress-bar': {
		backgroundColor:
			value <= 10
				? theme?.palette?.infuuse?.red300
				: value > 10 && value <= 30
				? theme?.palette?.infuuse?.orange200
				: theme?.palette?.infuuse?.green300,
	},
}));
