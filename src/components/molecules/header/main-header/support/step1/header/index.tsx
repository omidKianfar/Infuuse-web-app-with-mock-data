import SupportBackIcon from '@/assets/support-back-icon';
import SupportIcon from '@/assets/support-icon';
import { NextButton } from '@/components/atoms/Button';
import { ConversationMessageCollectionSegment, TypeSocialNetwork } from '@/graphql/generated';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
	setCounter: Dispatch<SetStateAction<number>>;
	supportHandler: React.Dispatch<React.SetStateAction<boolean>>;
	conversationLastMessageData: ConversationMessageCollectionSegment;
}

const Header = ({ setCounter, supportHandler, conversationLastMessageData }: Props) => {
	const theme = useTheme();

	return (
		<Stack bgcolor={theme?.palette?.infuuse?.blueDark200} height={'100px'} p={1}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'100%'}>
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
					<SupportIcon fill={theme?.palette?.infuuse?.orange100} />
				</Box>

				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} pr={1}>
					<NextButton sx={{ width: '250px' }} onClick={() => setCounter(1)} disabled={conversationLastMessageData?.items[0]?.typeSocialNetwork === TypeSocialNetwork?.SupportChatSurvey}>
						Finish Conversation
					</NextButton>
				</Box>
			</Stack>

			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} pl={'4px'}>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					onClick={() => supportHandler(false)}
					sx={{ cursor: 'pointer' }}
					mr={1}
				>
					<SupportBackIcon />
				</Box>
				<Typography color={theme?.palette?.common?.white} fontWeight={'bold'}>
					Infuuse
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Header;
