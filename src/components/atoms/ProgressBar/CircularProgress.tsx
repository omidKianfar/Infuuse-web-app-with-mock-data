import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
	size: number;
	color: any;
}

export default function LoadingProgress({ size, color }: Partial<Props>) {
	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress size={size} sx={{ color: color ? color : '#fff' }} />
		</Box>
	);
}
