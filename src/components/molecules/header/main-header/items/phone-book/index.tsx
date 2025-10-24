import PhonebookIcon from '@/assets/phonebook-icon';
import { Box, Tooltip, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const PhoneBookItem = () => {
	const router = useRouter();
	const theme = useTheme();
    
	return (
		<>
			<Tooltip title="Phone Book">
				<Box onClick={() => router.push('/phonebook')} sx={{ cursor: 'pointer', ml: 2 }}>
					<PhonebookIcon
						fill={
							router?.pathname.includes('/phonebook')
								? theme?.palette?.infuuse.blueLight600
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default PhoneBookItem;
