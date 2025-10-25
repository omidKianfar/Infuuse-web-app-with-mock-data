import UserActive from '@/assets/user-active';
import Image from '@/components/atoms/Image';
import { LineStatus, useUser_EditProfileMutation, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import React from 'react';

const HeaderSettingSidebar = () => {
	const theme = useTheme();

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const { mutate: updateProfile } = useUser_EditProfileMutation();

	const activeHandler = () => {
		updateProfile(
			{
				input: {
					photoUrl: CurrentUser?.user?.photoUrl,
					fullName: CurrentUser?.user?.fullName,
					lineStatus:
						CurrentUser?.user?.lineStatus === LineStatus?.Active ? LineStatus?.Away : LineStatus?.Active,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['user_getCurrentUser']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack>
			<Stack mb={3}>
				<Image src={'/images/infuuse-logo.svg'} style={{ width: '120px' }} />
			</Stack>

			<Typography color={theme?.palette?.infuuse.blue200} fontSize={'24px'} fontWeight={600} mb={2}>
				Setting
			</Typography>

			{/* -------------------------------active user */}
			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
				<UserActive />

				<Typography color={theme?.palette?.infuuse.blueLight600} fontSize={'16px'} ml={1} mr={1}>
					Set Yourself As
				</Typography>

				<Box onClick={activeHandler} sx={{ cursor: 'pointer' }}>
					<Typography
						sx={{
							textTransform: 'none',
							fontSize: '16px',
							color: theme?.palette?.infuuse.green400,
							fontWeight: 600,
						}}
					>
						Away
					</Typography>
				</Box>
			</Stack>
		</Stack>
	);
};

export default HeaderSettingSidebar;
