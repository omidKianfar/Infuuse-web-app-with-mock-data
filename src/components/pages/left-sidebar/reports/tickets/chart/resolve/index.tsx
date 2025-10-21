import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Stack, styled, TextField, Typography, useTheme } from '@mui/material';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler // Ensure Filler is registered
);

interface Props {
	title: string
}

const TicketResolveMonthlyChart = ({ title }: Props) => {
	const theme = useTheme();

	const data = {
		labels: ['10.01', '10.04', '10.07', '10.10'],
		datasets: [
			{
				label: 'Tickets Produced',
				data: [5000, 7000, 9000, 9036], // Example data
				fill: true, // Ensure the area under the line is filled
				backgroundColor: 'rgba(71, 221, 172, 0.8)', // Color of the filled area
				borderColor: 'rgba(71, 221, 172, 0.8)', // Line color
				borderWidth: 2, // Width of the line
				tension: 0.4, // Smooths the line
				pointBackgroundColor: 'rgba(71, 221, 172, 0.8)',
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},

			afterDraw: (chart) => {
				const ctx = chart.ctx;
				const yScale = chart.scales['y'];
				ctx.save();
				ctx.font = '12px Arial';
				ctx.fillStyle = '#333';
				ctx.textAlign = 'center';

				yScale.ticks.forEach((tick, index) => {
					const x = yScale.getPixelForTick(index);
					ctx.fillText(tick, x, yScale.top - 10); // Position the labels above the chart
				});

				ctx.restore();
			},
		},
		scales: {
			x: {
				display: true,
				title: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
			y: {
				display: true,
				title: {
					display: false,
				},
				beginAtZero: true,
				grid: {
					display: false,
				},
				ticks: {
					display: false, // Hide the default y-axis labels
				},
			},
		},
		layout: {
			padding: {
				top: 30, // Add padding to the top for the custom text
			},
		},
	};
	return (
		<Stack mb={4} width={'100%'} height={'100%'} maxWidth={'500px'}>
			{/* <Stack mr={2} width={'200px'} mb={2}>
				<CustomTextField select value={timeRange}>
					{ChartSortData?.map((item) => (
						<MenuItem key={item?.value} value={item?.value} onClick={() => setTimeRange(item?.value)}>
							<Typography>{item?.name}</Typography>
						</MenuItem>
					))}
				</CustomTextField>
			</Stack> */}

			{/* {chartData && chartData.labels && chartData.datasets && ( */}
			<Stack
				bgcolor={theme?.palette?.common?.white}
				border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
				p={1}
				borderRadius={2}
			>
				<Stack mb={1} pl={2}>
					<Typography fontSize={'16px'} color={theme?.palette?.infuuse?.blue500}>
						{title}
					</Typography>
				</Stack>
				<Line data={data} options={options} />
			</Stack>
			{/* )} */}
		</Stack>
	);
};

export default TicketResolveMonthlyChart;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'transparent',
		borderRadius: '16px',
		height: '48px',
		width: '100%',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
			// borderRadius: "16px",
		},
		'& fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			backgroundColor: 'transparent',
			height: '48px',
			border: `2px solid ${theme?.palette?.infuuse?.gray500}`,

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray500,
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
