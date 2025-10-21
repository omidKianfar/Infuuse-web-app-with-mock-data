import { Box, Checkbox, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
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
import { BusinessContainer, EditAvatarContainer, Label } from '../../styles';
import {
	BusinessTypeMember,
	useBusiness_EditMutation,
	useBusinessMember_GetListQuery,
	UserType,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

interface DefaultValueProps {
	name: string;
	isHideAgency: boolean;
}

const OwnerMyBusiness = () => {
	// -------------------------------tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------state
	const [photoUrl, setPhotoUrl] = useState('');

	// -------------------------------query
	// update business
	const { mutate: editBusinessOwner } = useBusiness_EditMutation();

	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// business member query
	const { data: BusinessMembers } = useBusinessMember_GetListQuery({
		skip: 0,
		take: 1,
		where: {
			typeMember: {
				eq: BusinessTypeMember?.Owner,
			},
		},
	});
	const BusinessMemberList = BusinessMembers?.businessMember_getList?.result;

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		name: CurrentUser?.businessAccesses[0]?.business?.name || '',
		isHideAgency: CurrentUser?.businessAccesses[0]?.business?.isHideAgency || false,
	};

	const methods = useForm({
		resolver: yupResolver(BusinessSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		editBusinessOwner(
			{
				input: {
					name: values?.name,
					logo: photoUrl,
					isHideAgency: values?.isHideAgency,
				},
				businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
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
			<BusinessContainer>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						<Stack mb={4} position={'relative'} width={'100px'} height={'100px'}>
							<Box position={'absolute'} left={'40%'} top={'40%'}>
								<Typography>{progress > 1 && progress < 100 ? `${progress}%` : null}</Typography>
							</Box>

							<Avatar
								src={getFullImageUrl(
									photoUrl ? photoUrl : CurrentUser?.businessAccesses[0]?.business?.logo
								)}
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

						{/* -------------------------------fields */}
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} mb={2}>
							<Stack width={'50%'}>
								<Label>Name of business</Label>

								<TextField
									name="name"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<UserIcon />
											</InputAdornment>
										),
									}}
								/>
							</Stack>

							<Stack width={'50%'}>
								<Label>Email</Label>

								<TextField
									name="email"
									fullWidth
									value={BusinessMemberList?.items[0]?.email}
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

						<Controller
							name={'isHideAgency'}
							render={({ field: { onChange, value } }) => {
								return (
									<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1}>
										<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
										<Typography color={theme?.palette?.infuuse?.blueDark500}>
											Hide From Agencies
										</Typography>
									</Stack>
								);
							}}
						/>
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
							{CurrentUser?.isBusinessOwner ||
							(CurrentUser?.user?.userType === UserType?.BusinessMember &&
								CurrentUser?.businessAccesses?.[0]?.access?.isSettingsManagmentAccess) ? (
								<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
									Save
								</NextButton>
							) : null}
						</Stack>
					</Stack>
				</FormProvider>
			</BusinessContainer>
		</Stack>
	);
};

export default OwnerMyBusiness;

// -------------------------------schema
const BusinessSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	isHideAgency: Yup.boolean(),
});
