import { Box, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { BaseSidebarContext } from '..';
import CloseIconBox from '@/assets/close-icon-box';
import AssignSearch from '@/components/atoms/search/assign-search';
import { useRouter } from 'next/router';
import { NextButton } from '@/components/atoms/Button';
import { useConversationMember_AddListMutation } from '@/graphql/generated';
import { queryClient } from 'pages/_app';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';

const AssignSidebar = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const BusinessId = router?.query?.businessId
	const ConversationId = router?.query?.conversationId

	// -------------------------------context
	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	// -------------------------------query
	const { mutate: assignUsers } = useConversationMember_AddListMutation()

	// -------------------------------states
	const [choosenAssignUserId, setChoosenAssignUserId] = useState<number | null>(null);
	const [choosenAssignUserName, setChoosenAssignUserName] = useState<string | null>(null);


	// -------------------------------functions
	const assignMemberHandler = () => {
		assignUsers(
			{
				conversationId: Number(ConversationId),
				users: [Number(choosenAssignUserId)]
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						setSidebars({
							...sidebars,
							assign: false,
						})
						queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
						queryClient.invalidateQueries(['conversation_getList'])
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	}

	return (
		<Stack
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------header */}
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
					Assign
				</Typography>
				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() =>
							setSidebars({
								...sidebars,
								assign: false,
							})
						}
					>
						<CloseIconBox />
					</Box>
				</Stack>
			</Stack>
			{/* -------------------------------saerch */}
			{/* assign */}
			<AssignSearch
				BusinessId={Number(BusinessId)}
				choosenAssignUserId={choosenAssignUserId}
				setChoosenAssignUserId={setChoosenAssignUserId}
				choosenAssignUserName={choosenAssignUserName}
				setChoosenAssignUserName={setChoosenAssignUserName}
			/>

			<Stack mt={4}>
				<NextButton onClick={assignMemberHandler}>Add</NextButton>
			</Stack>
		</Stack>
	);
};

export default AssignSidebar;

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	// ["@media (max-width:600px)"]: {

	// },

	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
	},
}));
