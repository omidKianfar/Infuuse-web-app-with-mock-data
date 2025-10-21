import { Box, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import EmailIcon from '@/assets/email-icon';
import Avatar from '@/components/atoms/avatar';
import EditIcon from '@/assets/edit-icon';
import useFileUpload from '@/hooks/useUploadFile';
import { getFullImageUrl, responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { EditAvatarContainer, ProfileContainer } from './styles';
import { LineStatus, UserType, useUser_EditProfileMutation, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useQueryClient } from '@tanstack/react-query';
import ModalContainer from '@/components/atoms/Modal';
import ChangePasswordModal from './modal';

interface DefaultValueProps {
	name: string;
	email: string;
	userRole: string;
	lineStatus: LineStatus;
}

const ProfileBody = () => {
	// -------------------------------tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------state
	const [photoUrl, setPhotoUrl] = useState('');

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// update profile
	const { mutate: updateProfile } = useUser_EditProfileMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		name: CurrentUser?.user?.fullName || '',
		email: CurrentUser?.user?.email || '',
		lineStatus: CurrentUser?.user?.lineStatus || LineStatus?.Active,
		userRole:
			CurrentUser?.user?.userType === UserType?.BusinessMember
				? 'Business Member'
				: CurrentUser?.user?.userType === UserType?.AgencyMember
				? 'Agency Memeber'
				: 'Administrator',
	};

	const methods = useForm({
		resolver: yupResolver(ProfileSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		updateProfile(
			{
				input: {
					photoUrl: photoUrl,
					fullName: values?.name,
					lineStatus: values?.lineStatus,
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

	//------------ modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	// -------------------------------functions

	// upload photo
	const inputRef = useRef<HTMLInputElement>();

	const { uploadFile, progress, reset, url } = useFileUpload();

	const UploadPicHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (!files?.length) return;

		try {
			const res = await uploadFile(files[0]);

			setPhotoUrl(res?.url as string);
		} catch (error) {
			enqueueSnackbar('Failed upload photo', { variant: 'error' });
		} finally {
			event.target.value = '';
		}
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			<ProfileContainer>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
						<Stack mb={4} position={'relative'} width={'100px'} height={'100px'}>
							<Box position={'absolute'} left={'40%'} top={'40%'}>
								<Typography>{progress > 1 && progress < 100 ? `${progress}%` : null}</Typography>
							</Box>

							{/* -------------------------------photo */}
							<Avatar
								src={getFullImageUrl(photoUrl ? photoUrl : CurrentUser?.user?.photoUrl)}
								width={'100px'}
								height={'100px'}
							/>

							<EditAvatarContainer
								onClick={() => {
									inputRef.current.click();
								}}
							>
								<EditIcon />
								<input
									type="file"
									hidden
									accept="image/*"
									onChange={(event) => UploadPicHandler(event)}
									ref={inputRef as any}
								/>
							</EditAvatarContainer>
						</Stack>

						{/* -------------------------------change password */}
						<NextButton
							onClick={handelModal}
							sx={{
								width: '200px',
								mt: 1,
								backgroundColor: theme?.palette?.infuuse?.orange200,
							}}
						>
							Change Password
						</NextButton>
					</Stack>

					<Stack position={'relative'}>
						{/* -------------------------------fields */}
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight500} mb={'4px'}>
									Name
								</Typography>

								<TextField
									name="name"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{' '}
												<UserIcon />
											</InputAdornment>
										),
									}}
								/>
							</Stack>

							<Stack width={'50%'}>
								<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight500} mb={'4px'}>
									Email
								</Typography>

								<TextField
									name="email"
									fullWidth
									disabled
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon />
											</InputAdornment>
										),
									}}
								/>
							</Stack>
						</Stack>

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} mt={2}>
							<Stack
								width={'50%'}
								direction={'row'}
								justifyContent={'center'}
								alignItems={'center'}
							></Stack>

							<Stack width={'50%'}>
								<Typography fontSize={'14px'} color={theme?.palette?.infuuse.blueLight500} mb={'4px'}>
									User Roles
								</Typography>
								<TextField
									name="userRole"
									fullWidth
									disabled
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<UserIcon />
											</InputAdornment>
										),
									}}
								/>
							</Stack>
						</Stack>
					</Stack>

					{/* ------------------------------- button */}
					<Stack
						position={'absolute'}
						left={0}
						bottom={'16px'}
						width={'100%'}
						justifyContent={'end'}
						alignItems={'center'}
					>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
							<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Save
							</NextButton>
						</Stack>
					</Stack>
				</FormProvider>
			</ProfileContainer>

			{/* modal */}
			<ModalContainer open={open} handleClose={handleClose}>
				<ChangePasswordModal handleClose={handleClose} />
			</ModalContainer>
		</Stack>
	);
};

export default ProfileBody;

// -------------------------------schema
const ProfileSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Email'),
	userRole: Yup.string().required('Enter Your User Role'),
	lineStatus: Yup.string().notRequired(),
});
