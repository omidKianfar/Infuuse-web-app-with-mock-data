import ContactIcon from '@/assets/contact-icon';
import { Box, Tooltip, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const ContactsItem = () => {
	const router = useRouter();
	const theme = useTheme();
    
	return (
		<>
			<Tooltip title="Contacts">
				<Box onClick={() => router.push('/contacts')} sx={{ cursor: 'pointer', ml: 2 }}>
					<ContactIcon
						fill={
							router?.pathname.includes('/contacts')
								? theme?.palette?.infuuse.red100
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default ContactsItem;
