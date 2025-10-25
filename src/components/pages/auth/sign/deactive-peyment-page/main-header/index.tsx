import { Box, Stack, Tooltip, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SupportIcon from '@/assets/support-icon';
import Support from '@/components/molecules/header/main-header/items/support/support';
import Image from '@/components/atoms/Image';

const MainHeader = () => {
	const theme = useTheme();

	const [SupportState, setSupportState] = useState(false);

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
				<Image src={'/images/infuuse-logo.svg'} />
				<Tooltip title="Support">
					<Box onClick={supportHandler} sx={{ cursor: 'pointer' }}>
						<SupportIcon
							fill={SupportState ? theme?.palette?.infuuse.orange300 : theme?.palette?.infuuse.gray500}
						/>
					</Box>
				</Tooltip>

			</>
		</Header>
	);
};

export default MainHeader;

const Header = styled(Stack)({
	width: '100%',
	height: '80px',
	padding: '0 32px',
});
