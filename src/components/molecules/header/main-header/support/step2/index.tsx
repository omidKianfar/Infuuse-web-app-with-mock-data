import { Box, Rating, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Header from './header';
import { NextButton } from '@/components/atoms/Button';
import StarGoldIcon from '@/assets/star-gold-icon';
import StarEmptyIcon from '@/assets/star-emty-icon';
import { useSupportChat_AddSupportSurveyMutation, useSupportChat_GetListQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';

interface Props {
	setCounter: Dispatch<SetStateAction<number>>;
}

const Step2 = ({ setCounter }: Props) => {
	const theme = useTheme();

	const [valueRate, setValueRate] = useState<number>(0);
	const [valueNote, setValueNote] = useState<string>('');

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUserId = User?.user_getCurrentUser?.result?.user?.id

	// get agency conversations
	const { data: supportChat } = useSupportChat_GetListQuery({
		skip: 0,
		take: 1,
		where: {
			conversationMembers: {
				some: {
					userId: {
						eq: Number(CurrentUserId)
					}
				}
			}
		},
	});

	const supportChatData = supportChat?.supportChat_getList?.result

	const { mutate: finishSupportChat } = useSupportChat_AddSupportSurveyMutation()

	const finishSupportConversation = () => {
		finishSupportChat(
			{
				conversationId: Number(supportChatData?.items[0]?.id),
				input: {
					name: valueNote,
					score: valueRate
				}

			},
			{
				onSuccess: async (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						setCounter(0)
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });

					}
				}
			},


		);
	}

	return (
		<Stack
			position={'absolute'}
			top={'70px'}
			right={'32px'}
			height={'100%'}
			maxHeight={'500px'}
			overflow={'auto'}
			width={'400px'}
			bgcolor={theme?.palette?.common?.white}
			borderRadius={4}
			zIndex={10000}
			boxShadow={4}
		>
			<Header setCounter={setCounter} />

			<Stack mt={2} position={'relative'} height={'100%'} width={'100%'} p={2}>
				<Typography color={theme?.palette?.infuuse?.blue500} mb={4}>
					Rate To Conversation
				</Typography>

				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mb={3}>
					<Rating
						name="size-large"
						value={valueRate}
						onChange={(event, newValue) => {
							setValueRate(newValue);
						}}
						icon={
							<Box ml={2}>
								<StarGoldIcon width="24px" height="24px" />
							</Box>
						}
						emptyIcon={
							<Box ml={2}>
								<StarEmptyIcon width="24px" height="24px" />
							</Box>
						}
					/>
				</Stack>

				<CustomDescription value={valueNote} name="description" placeholder="Write a review" fullWidth rows={3} multiline onChange={(e) => setValueNote(e.target.value)} />

				<Stack
					direction={'row'}
					justifyContent={'center'}
					alignItems={'center'}
					position={'absolute'}
					bottom={0}
					left={0}
					p={2}
					width={'100%'}
				>
					<NextButton sx={{ width: '150px', cursor: 'pointer' }} onClick={finishSupportConversation}>Save</NextButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Step2;

export const CustomDescription = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
		borderRadius: '16px',
		height: '100px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
			height: '100px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
			height: '100px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));
