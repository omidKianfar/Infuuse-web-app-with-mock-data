import TicketIcon from '@/assets/ticket-icon';
import { Box, Tooltip, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const TicketItem = () => {
	const router = useRouter();
	const theme = useTheme();
    
	return (
		<>
			<Tooltip title="Ticket">
				<Box onClick={() => router.push('/ticket')} sx={{ cursor: 'pointer', ml: 2 }}>
					<TicketIcon
						fill={
							router?.pathname.includes('/ticket')
								? theme?.palette?.infuuse.blue400
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>{' '}
		</>
	);
};

export default TicketItem;
