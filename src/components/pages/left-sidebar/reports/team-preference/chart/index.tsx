import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart = () => {
	const theme = useTheme();

	const [timeRange, setTimeRange] = useState('All Time');
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: 'Sales',
				data: [],
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
		],
	});

	const getDataForTimeRange = (range) => {
		switch (range) {
			case 'Past Day':
				return {
					labels: [
						'Sam',
						'John',
						'Lora',
						'Sara',
						'Mick',
						'Tom',
						'Mia',
						'Scot',
						'Henry',
						'jack',
						'david',
						'peni',
					],
					data: [10, 20, 15, 20, 25, 30, 35, 40, 20, 100, 12, 48, 86],
				};
			case 'Past Week':
				return {
					labels: [
						'Sam',
						'John',
						'Lora',
						'Sara',
						'Mick',
						'Tom',
						'Mia',
						'Scot',
						'Henry',
						'jack',
						'david',
						'peni',
					],
					data: [10, 20, 15, 20, 25, 30, 35, 40, 20, 100, 12, 48, 86],
				};
			case 'Past Month':
				return {
					labels: [
						'Sam',
						'John',
						'Lora',
						'Sara',
						'Mick',
						'Tom',
						'Mia',
						'Scot',
						'Henry',
						'jack',
						'david',
						'peni',
					],
					data: [10, 20, 15, 20, 25, 30, 35, 40, 20, 100, 12, 48, 86],
				};
			case 'Past Year':
				return {
					labels: [
						'Sam',
						'John',
						'Lora',
						'Sara',
						'Mick',
						'Tom',
						'Mia',
						'Scot',
						'Henry',
						'jack',
						'david',
						'peni',
					],
					data: [10, 20, 15, 20, 25, 30, 35, 40, 20, 100, 12, 48, 86],
				};
			case 'All Time':
			default:
				return {
					labels: [
						'Sam',
						'John',
						'Lora',
						'Sara',
						'Mick',
						'Tom',
						'Mia',
						'Scot',
						'Henry',
						'jack',
						'david',
						'peni',
					],
					data: [10, 20, 15, 20, 25, 30, 35, 40, 20, 100, 12, 48, 86],
				};
		}
	};

	useEffect(() => {
		const { labels, data } = getDataForTimeRange(timeRange);
		setChartData({
			labels,
			datasets: [
				{
					data,
					backgroundColor: '#DB5AEE',
					barThickness: 30,
					borderRadius: 16,
				},
			],
		});
	}, [timeRange]);

	const options = {
		responsive: true,
		plugins: {
			legend: null,
			title: null,
			tooltip: {
				backgroundColor: theme?.palette?.infuuse?.blueDrak500,
				bodycolor: theme?.palette?.infuuse?.gray500,
				bodyFontSize: 35,
				titleFont: {
					size: 20,
				},
				padding: 16,
				titleColor: theme?.palette?.infuuse?.gray200,
				titleFontSize: 40,
				yAlign: 'bottom',
				displayColors: false,
				titleMarginBottom: 9,
				titleSpacing: 4,
				callbacks: {
					label: function (context) {
						let label = context?.label;
						return label;
					},
					title: function (context) {
						return `${context[0]?.parsed?.y}%`;
					},
					labelTextColor: function (context) {
						return theme?.palette?.infuuse?.gray500;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: true,
					drawBorder: false,
					beginAtZero: true,
				},
				ticks: {
					color: theme?.palette?.infuuse?.blueDark500,
					padding: 16,

					font: {
						size: '14px',
						family: 'Poppins',
					},
					callback: function (value) {
						return '%' + ' ' + value;
					},
				},
			},
			x: {
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					color: theme?.palette?.infuuse?.blueDark500,

					font: {
						size: '14px',
						family: 'Poppins',
					},
				},
			},
		},
	};

	return (
		<Stack mb={4}>
			<Stack mr={2} width={'200px'} mb={2}>
				<CustomTextField select value={timeRange}>
					{ChartSortData?.map((item) => (
						<MenuItem key={item?.value} value={item?.value} onClick={() => setTimeRange(item?.value)}>
							<Typography>{item?.name}</Typography>
						</MenuItem>
					))}
				</CustomTextField>
			</Stack>

			{chartData && chartData.labels && chartData.datasets && (
				<Stack
					bgcolor={theme?.palette?.common?.white}
					border={`2px solid ${theme?.palette?.infuuse?.gray500}`}
					py={2}
					borderRadius={2}
					width={'100%'}
				>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={2}>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
							<Typography fontSize={'16px'} color={theme?.palette?.infuuse?.blue500} mr={1}>
								Average Response Time{' '}
							</Typography>

							<CustomBox mr={1}>
								<Typography>Appt Booked</Typography>
							</CustomBox>

							<CustomBox mr={1}>
								<Typography>Lead</Typography>
							</CustomBox>
						</Stack>

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#DB5AEE'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>Converted</Typography>
							</CustomBox>

							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#79D4F2'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>ARS</Typography>
							</CustomBox>

							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#FFBC01'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>Pending Leads</Typography>
							</CustomBox>
						</Stack>
					</Stack>
					<Stack width={'100%'} height={'100%'} maxHeight={'400px'}>
						<Bar data={chartData} options={options} />
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

export default MonthlyChart;

const ChartSortData = [
	{ name: 'All Time', value: 'All Time' },
	{ name: 'Past Day', value: 'Past Day' },
	{ name: 'Past Week', value: 'Past Week' },
	{ name: 'Past Month', value: 'Past Month' },
	{ name: 'Past Year', value: 'Past Year' },
];

export const CustomBox = styled(Box)(({ theme }) => ({
	borderRadius: '8px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	border: `1px solid ${theme?.palette?.infuuse?.gray500}`,
	padding: '4px 8px',
}));

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
