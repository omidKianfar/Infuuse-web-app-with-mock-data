import { LinearProgress, Stack, styled, useTheme } from '@mui/material';
import React from 'react';
import TicketResolveMonthlyChart from './chart/resolve';
import TicketUnResolveMonthlyChart from './chart/unresolve';
import TicketTotalMonthlyChart from './chart/total';

const Tickets = () => {
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
			<Stack
				width={'100%'}
				height={'100%'}
				direction={'row'}
				justifyContent={'start'}
				alignItems={'center'}
				spacing={1}
			>
				<TicketTotalMonthlyChart title='The number of tickets produced' />
				<TicketResolveMonthlyChart title='The number of tickets produced resolved' />
				<TicketUnResolveMonthlyChart title='The number of tickets produced unresolved' />
			</Stack>
		</Stack>
	);
};

export default Tickets;

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
