import { Box, Stack, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import Header from '../chat/header/header';
import LiveChatIcon from '@/assets/live-chat-icon';
import {
	ConversationType,
	useContact_FetchOrCreateByContactMutation,
	useConversation_FetchOrCreateByContactMutation,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import settingLiveChatStore from '@/store/setting-live-chat.store';
import { useSnapshot } from 'valtio';

interface Props {
	setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const AddContactChat = ({ setCounter }: Props) => {
	// ------------------------------- tools
	const theme = useTheme();
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

	// ------------------------------- router data
	const BusinessKey = router?.query?.key;

	// -------------------------------state management
	const { contactId, conversationId, contactEmail } = useSnapshot(settingLiveChatStore);

	// ------------------------------- query
	const { mutate: ContactFetchOrCreate } = useContact_FetchOrCreateByContactMutation();
	const { mutate: ConversationFetchOrCreate } = useConversation_FetchOrCreateByContactMutation();

	// -------------------------------form
	const defaultValues = {
		email: '',
		phoneNumber: '',
	};

	const methods = useForm({
		resolver: yupResolver(TicketSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		ContactFetchOrCreate(
			{
				businessKey: BusinessKey as string,
				input: {
					email: values?.email,
					phoneNumber: values?.phoneNumber,
				},
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						settingLiveChatStore.contactId = Number(result.id);
						settingLiveChatStore.contactEmail = values?.email as string;

						ConversationFetchOrCreate(
							{
								businessKey: BusinessKey as string,
								input: {
									type: ConversationType?.SocialNetworkChat,
									contactId: Number(result.id),
									isPinned: false,
								},
							},
							{
								onSuccess: (data) => {
									const { status, result } = responseDestructure(data);
									if (status.code == 1) {
										settingLiveChatStore.conversationId = Number(result.id);

										setCounter(1);
									} else {
										enqueueSnackbar(status.description, { variant: 'error' });
									}
								},
							}
						);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	const handleKeyPress = (event) => {
		const regex = /^[0-9+]+$/;
		if (!regex.test(event.key)) {
			event.preventDefault();
		}
	};

	return (
		<Stack
			width={isMobile ? '100vw' : '100%'}
			height={'100%'}
			maxHeight={'100vh'}
			overflow={'auto'}
			bgcolor={theme?.palette?.infuuse?.gray100}
			p={2}
		>
			<Header />
			<Stack
				width={'100%'}
				height={'100%'}
				maxHeight={'100vh'}
				overflow={'auto'}
				bgcolor={theme?.palette?.infuuse?.gray200}
				p={2}
				borderRadius={2}
				mt={2}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Stack width={isMobile ? '100%' : '500px'}>
					<Stack justifyContent={'center'} alignItems={'center'} mb={4}>
						<Box mb={2}>
							<LiveChatIcon
								width={isMobile ? '40px' : '80px'}
								height={isMobile ? '40px' : '80px'}
								fill={theme?.palette?.infuuse?.green300}
							/>
						</Box>
						<Typography
							fontSize={'20px'}
							color={theme?.palette?.infuuse?.blueDark500}
							textAlign={isMobile ? 'center' : 'start'}
						>
							Enter your email to start chatting with us
						</Typography>
					</Stack>

					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						<Stack width={'100%'}>
							<Label mb={'4px'}>Email</Label>

							<TextField name="email" fullWidth />
						</Stack>

						<Stack mb={4}>
							<Label mb={'4px'}>Phone Number</Label>

							<TextField
								name="phoneNumber"
								inputProps={{
									pattern: '[0-9+]*',
								}}
								onKeyPress={handleKeyPress}
								fullWidth
							/>
						</Stack>

						<Stack justifyContent={'center'} alignItems={'center'}>
							<NextButton type="submit" sx={{ width: '270px' }}>
								Join
							</NextButton>
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AddContactChat;

// -------------------------------schema
const TicketSchema = Yup.object().shape({
	email: Yup.string().email().required('Enter Your Email'),
	phoneNumber: Yup.string()
		.matches(/^\+\d{8,14}$/, 'Phone number must start with + and be between 9 to 15 digits long')
		.required('Enter Your Phone Number'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
