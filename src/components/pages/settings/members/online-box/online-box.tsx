import { LineStatus } from '@/graphql/generated';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
	online?: boolean;
	lineStatus?: LineStatus;
}

const OnlineBox = ({ online, lineStatus }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
			{/* color */}
			<Box
				width={'12px'}
				height={'12px'}
				borderRadius={'360px'}
				bgcolor={
					online && lineStatus === LineStatus?.Active
						? theme?.palette?.infuuse?.green100
						: online && lineStatus === LineStatus?.Away
						? theme?.palette?.infuuse?.orange100
						: theme?.palette?.infuuse?.gray500
				}
			></Box>

			{/* status */}
			<Typography fontSize={'14px'} ml={1}>
				{online && lineStatus === LineStatus?.Active
					? 'Active'
					: lineStatus === LineStatus?.Away
					? 'AwayS'
					: 'Offline'}
			</Typography>
		</Stack>
	);
};

export default OnlineBox;
