import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import GroupUserSearch from '@/components/atoms/search/group-user-search';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import CloseIconBox from '@/assets/close-icon-box';
import { useInternalChat_AddInternalConversationMutation } from '@/graphql/generated';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface Props {
	handleClose: () => void;
}

const AddGroup = ({ handleClose }: Props) => {
	const theme = useTheme();

	const [choosenGroupUser, setChoosenGroupUser] = useState([]);


	const defaultValues = {
		name: '',
	};

	const methods = useForm({
		resolver: yupResolver(GroupSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const { mutate: AddInternalChatConversation } = useInternalChat_AddInternalConversationMutation()

	const onSubmit = (values: typeof defaultValues) => {
		const ids = [];
		choosenGroupUser.map((user) => (
			ids.push(user?.id)
		))
		AddInternalChatConversation(
			{
				internalConveInput: {
					title: values?.name,
					users: ids
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose()
						queryClient.refetchQueries(['conversation_getList']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	const groupUserDelete = (userId) => {
		const filterList = choosenGroupUser?.filter((user) => user?.id !== userId);
		setChoosenGroupUser(filterList);
	};

	return (
		<Stack
			width={'450px'}
			height={'100%'}
			p={2}
			borderRadius={2}
			boxShadow={4}
			bgcolor={theme?.palette?.infuuse?.gray100}
		>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'}>
					Create Group
				</Typography>

				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					sx={{ cursor: 'pointer' }}
					onClick={handleClose}
				>
					<CloseIconBox />
				</Box>
			</Stack>

			{/* -------------------------------form */}
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack>
					<Label mb={'4px'}>Group Name</Label>

					<TextField name="name" fullWidth />
				</Stack>

				<Stack mt={2}>
					{/* -------------------------------saerch */}
					{/* group search */}
					<GroupUserSearch choosenGroupUser={choosenGroupUser} setChoosenGroupUser={setChoosenGroupUser} />
				</Stack>

				{/* ------------------------- user list */}
				<Stack height={'100%'} maxHeight={'200px'} overflow={'auto'} spacing={1}>
					{choosenGroupUser?.map((user) => (
						<Stack
							key={user.id}
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							border={`2px solid ${theme?.palette?.infuuse?.blue100}`}
							borderRadius={3}
							p={1}
						>
							<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
								<Avatar src={getFullImageUrl(user?.photoUrl)} width={'32px'} height={'32px'} />

								<Typography color={theme?.palette?.infuuse?.blueDark500} fontWeight={'bold'} ml={1}>
									{stringSlicer(user.fullName, 40)}
								</Typography>
							</Stack>

							<Box
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								onClick={() => groupUserDelete(user.id)}
								sx={{ cursor: 'pointer' }}
							>
								<CloseIcon
									sx={{
										'&:hover': {
											color: theme?.palette?.infuuse?.red300,
										},
									}}
								/>
							</Box>
						</Stack>
					))}
				</Stack>

				{/* ------------------------------- footer */}
				<Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'center'} mt={4}>
					<NextButton type="submit" sx={{ width: '200px', fontSize: '16px', fontWeight: 600 }}>
						Save
					</NextButton>
				</Stack>
			</FormProvider>
		</Stack>
	);
};

export default AddGroup;

const GroupSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Group Name'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
