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
				label: '',
				data: [],
			},
			{
				label: '',
				data: [],
			},
			{
				label: '',
				data: [],
			},
		],
	});

	const getDataForTimeRange = (range) => {
		switch (range) {
			case 'Past Day':
				return {
					labels: ['Chat', 'Email', 'Phone', 'Sms', 'Facebook', 'Instagrams', 'Whatsapp', 'Video'],
					data1: [10, 20, 15, 20, 25, 30, 35, 40],
					data2: [22, 80, 15, 20, 100, 30, 35, 40],
					data3: [10, 20, 15, 20, 25, 30, 35, 40],
				};
			case 'Past Week':
				return {
					labels: ['Chat', 'Email', 'Phone', 'Sms', 'Facebook', 'Instagrams', 'Whatsapp', 'Video'],
					data1: [10, 20, 15, 20, 25, 30, 35, 40],
					data2: [10, 20, 15, 20, 25, 30, 35, 40],
					data3: [22, 80, 15, 20, 100, 30, 35, 40],
				};
			case 'Past Month':
				return {
					labels: ['Chat', 'Email', 'Phone', 'Sms', 'Facebook', 'Instagrams', 'Whatsapp', 'Video'],
					data1: [22, 80, 15, 20, 100, 30, 35, 40],
					data2: [10, 20, 15, 20, 25, 30, 35, 40],
					data3: [10, 20, 15, 20, 25, 30, 35, 40],
				};
			case 'Past Year':
				return {
					labels: ['Chat', 'Email', 'Phone', 'Sms', 'Facebook', 'Instagrams', 'Whatsapp', 'Video'],
					data1: [10, 20, 15, 20, 25, 30, 35, 40],
					data2: [10, 20, 15, 20, 25, 30, 35, 40],
					data3: [22, 80, 15, 20, 100, 30, 35, 40],
				};
			case 'All Time':
			default:
				return {
					labels: ['Chat', 'Email', 'Phone', 'Sms', 'Facebook', 'Instagrams', 'Whatsapp', 'Video'],
					data1: [22, 80, 15, 20, 100, 30, 35, 40],
					data2: [10, 20, 15, 20, 25, 30, 35, 40],
					data3: [10, 20, 15, 20, 25, 30, 35, 40],
				};
		}
	};

	useEffect(() => {
		const { labels, data1, data2, data3 } = getDataForTimeRange(timeRange);
		setChartData({
			labels,
			datasets: [
				{
					data: data1,
					backgroundColor: '#6DB6D5',
					barThickness: 10,
					borderRadius: 16,
					stack: 'Stack 0',
					marginTop: 16,
				},
				{
					data: data2,
					backgroundColor: '#47DDAC',
					barThickness: 10,
					borderRadius: 16,
					stack: 'Stack 0',
					marginTop: 16,
				},
				{
					data: data3,
					backgroundColor: '#F7BD42',
					barThickness: 10,
					borderRadius: 16,
					stack: 'Stack 0',
				},
			],
		});
	}, [timeRange]);

	const options = {
		responsive: true,
		aspectRatio: 2,
		plugins: {
			legend: false,
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
				grid: {
					display: false,
					drawBorder: false,
					lineWidth: 0.5,
				},
				ticks: {
					color: '#809FB8',
					padding: 20,
					callback: function (value, index, values) {
						return value.toString().match(/.{2,3}(?=..)|.+/g) + '%';
					},
					font: {
						size: '14px',
						weight: 'bold',
					},
				},
			},
			x: {
				grid: {
					display: true,
				},
				ticks: {
					color: '#7C8AA6',
					font: {
						size: '14px',
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
				>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={1} px={2}>
						<Typography fontSize={'16px'} color={theme?.palette?.infuuse?.blue500}>
							Customer Analytics{' '}
						</Typography>

						<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#6DB6D5'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>Lead</Typography>
							</CustomBox>

							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#47DDAC'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>Appt Booked</Typography>
							</CustomBox>

							<CustomBox mr={1}>
								<Box
									borderRadius={'4px'}
									bgcolor={'#F7BD42'}
									width={'16px'}
									height={'16px'}
									mr={1}
								></Box>
								<Typography>Appt done</Typography>
							</CustomBox>
						</Stack>
					</Stack>
					<Bar data={chartData} options={options} />
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
