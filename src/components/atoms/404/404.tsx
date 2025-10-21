import { Error404 } from '@/assets/404-icon';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Page404 = () => {
	return (
		<>
			<Error404 />
			<Button LinkComponent={Link} href="/" sx={{ mt: 5, width: 350 }}>
				Go to home page
			</Button>
		</>
	);
};

export default Page404;
