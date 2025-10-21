import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';

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
					labels: ['H 1', 'H 2', 'H 3', 'H 4', 'H 5', 'H 6', 'H 7', 'H 8'],
					data: [22, 10, 15, 20, 25, 30, 35, 40],
				};
			case 'Past Week':
				return {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: [10, 20, 30, 40, 50, 60, 70],
				};
			case 'Past Month':
				return {
					labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
					data: [100, 200, 300, 400],
				};
			case 'Past Year':
				return {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 300, 250, 200],
				};
			case 'All Time':
			default:
				return {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					data: [50, 100, 75, 100, 50, 125, 25, 50, 400, 200, 20, 250],
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
					backgroundColor: theme?.palette?.infuuse?.green500,
					barThickness: 40,
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
						return '$' + ' ' + value;
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
					height={'450px'}
				>
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
