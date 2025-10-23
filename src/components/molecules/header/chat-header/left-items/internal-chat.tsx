import InternalChatIcon from '@/assets/internal-chat-icon';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Props } from '../types';

const InternalChatHeader = ({ conversationData }:Partial<Props>) => {
	const theme = useTheme();

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} height={'100%'}>
			<Box display={'flex'} justifyContent={'start'} alignItems={'center'} height={'80px'} width={'100%'} pl={2}>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					mr={2}
					bgcolor={theme?.palette?.infuuse?.gray400}
					borderRadius={'360px'}
					p={'4px'}
				>
					<InternalChatIcon width="32px" height="32px" fill={theme?.palette?.infuuse?.porple200} />
				</Box>
				<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'18px'} fontWeight={'bold'}>
					{conversationData?.items?.[0]?.conversation?.title}
				</Typography>
			</Box>
		</Stack>
	);
};

export default InternalChatHeader;
