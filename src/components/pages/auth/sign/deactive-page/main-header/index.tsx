import { Box, Stack, Tooltip, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SupportIcon from '@/assets/support-icon';
import Support from '@/components/molecules/header/main-header/items/support/support';
import Image from '@/components/atoms/Image';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

const MainHeader = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const [SupportState, setSupportState] = useState(false);

	const { logout } = useAuth();

	// -----------------------------------functions
	const handleLogout = async () => {
		try {
			await logout();
			router.replace('/signin');
		} catch (error) {
			console.error(error);
		}
	};

	const supportHandler = () => {
		setSupportState(!SupportState);
	};

	return (
		<Header
			direction={'row'}
			justifyContent={'space-between'}
			alignItems={'center'}
			border={`1px solid ${theme?.palette?.infuuse?.gray500}`}
		>
			<>
				{/* <Tooltip title="Logout">
					<Box onClick={handleLogout} sx={{ cursor: 'pointer' }}>
						Logout
					</Box>
				</Tooltip> */}

				<Image src={'/images/infuuse-logo.svg'} />

				{/* -------------------------------support */}
				<Tooltip title="Support">
					<Box onClick={supportHandler} sx={{ cursor: 'pointer' }}>
						<SupportIcon
							fill={SupportState ? theme?.palette?.infuuse.orange300 : theme?.palette?.infuuse.gray500}
						/>
					</Box>
				</Tooltip>
				{SupportState ? <Support supportHandler={supportHandler} /> : null}
			</>
		</Header>
	);
};

export default MainHeader;

// -------------------------------style
const Header = styled(Stack)({
	width: '100%',
	height: '80px',
	padding: '0 32px',
});
