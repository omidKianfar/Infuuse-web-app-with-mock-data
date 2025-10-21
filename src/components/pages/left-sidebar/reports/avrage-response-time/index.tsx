import { LinearProgress, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import MonthlyChart from './left-side/chart';
import LeftSide from './left-side';

const AvrageResponseTime = () => {
	const theme = useTheme();

	// -----------------------right sidebar state
	const [progress, setProgress] = React.useState({
		allCall: 22,
		missedCalls: 29,
		incomingCall: 80,
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
				<LeftSide />
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
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
							<Typography color={theme?.palette?.infuuse?.blue500}>All Call</Typography>

							<Typography
								color={
									progress?.allCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.allCall > 10 && progress?.allCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								310002
							</Typography>
						</Stack>

						<CustomLinearProgress variant="determinate" value={progress?.allCall} />

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mt={'4px'}>
							<Typography
								color={
									progress?.allCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.allCall > 10 && progress?.allCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								31 h
							</Typography>
						</Stack>
					</Stack>

					<Stack mb={2}>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
							<Typography color={theme?.palette?.infuuse?.blue500}> Missed Calls</Typography>

							<Typography
								color={
									progress?.missedCalls <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.missedCalls > 10 && progress?.missedCalls <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								310002
							</Typography>
						</Stack>

						<CustomLinearProgress variant="determinate" value={progress?.missedCalls} />

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mt={'4px'}>
							<Typography
								color={
									progress?.missedCalls <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.missedCalls > 10 && progress?.missedCalls <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								31 h
							</Typography>
						</Stack>
					</Stack>

					<Stack mb={2}>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
							<Typography color={theme?.palette?.infuuse?.blue500}>Incoming Call</Typography>

							<Typography
								color={
									progress?.incomingCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.incomingCall > 10 && progress?.incomingCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								310002
							</Typography>
						</Stack>

						<CustomLinearProgress variant="determinate" value={progress?.incomingCall} />

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mt={'4px'}>
							<Typography
								color={
									progress?.incomingCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.incomingCall > 10 && progress?.incomingCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								31 h
							</Typography>
						</Stack>
					</Stack>

					<Stack mb={2}>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
							<Typography color={theme?.palette?.infuuse?.blue500}>Calls under 180 seconds</Typography>

							<Typography
								color={
									progress?.incomingCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.incomingCall > 10 && progress?.incomingCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								310002
							</Typography>
						</Stack>

						<CustomLinearProgress variant="determinate" value={progress?.incomingCall} />

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mt={'4px'}>
							<Typography
								color={
									progress?.incomingCall <= 10
										? theme?.palette?.infuuse?.red300
										: progress?.incomingCall > 10 && progress?.incomingCall <= 30
											? theme?.palette?.infuuse?.orange200
											: theme?.palette?.infuuse?.green300
								}
							>
								31 h
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AvrageResponseTime;

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
