import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import MonthlyChart from './chart';
import SouthIcon from '@mui/icons-material/South';

const CustomAnalytics = () => {
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
				<Stack>
					<Stack
						bgcolor={theme?.palette?.common?.white}
						border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
						borderRadius={2}
						height={'100%'}
						p={2}
						mb={2}
					>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<CustomBox bgcolor={'rgba(247,189,66,0.5)'}>
								<SouthIcon sx={{ fill: '#F7BD42' }} />
							</CustomBox>

							<Stack ml={2}>
								<Typography
									color={theme?.palette?.infuuse?.blueDark500}
									fontSize={'20px'}
									fontWeight={'bold'}
								>
									7690.00
								</Typography>
								<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'16px'}>
									New Customers
								</Typography>
							</Stack>
						</Stack>
					</Stack>

					<Stack
						bgcolor={theme?.palette?.common?.white}
						border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
						borderRadius={2}
						height={'100%'}
						p={2}
						mb={2}
					>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<CustomBox bgcolor={'rgba(71,221,172,0.5)'}>
								<SouthIcon sx={{ fill: '#47DDAC' }} />
							</CustomBox>

							<Stack ml={2}>
								<Typography
									color={theme?.palette?.infuuse?.blueDark500}
									fontSize={'20px'}
									fontWeight={'bold'}
								>
									780.00{' '}
								</Typography>
								<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'16px'}>
									Subscribers{' '}
								</Typography>
							</Stack>
						</Stack>
					</Stack>

					<Stack
						bgcolor={theme?.palette?.common?.white}
						border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
						borderRadius={2}
						height={'100%'}
						p={2}
						mb={2}
					>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<CustomBox bgcolor={'rgba(109,182,213,0.5)'}>
								<SouthIcon sx={{ fill: '#6DB6D5' }} />
							</CustomBox>

							<Stack ml={2}>
								<Typography
									color={theme?.palette?.infuuse?.blueDark500}
									fontSize={'20px'}
									fontWeight={'bold'}
								>
									8090.00{' '}
								</Typography>
								<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'16px'}>
									Current Clients{' '}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CustomAnalytics;

export const CustomBox = styled(Box)(({ theme }) => ({
	borderRadius: '8px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '16px',
}));
