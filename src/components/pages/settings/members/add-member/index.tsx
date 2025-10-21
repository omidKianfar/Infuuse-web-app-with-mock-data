import { Box, Checkbox, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import EmailIcon from '@/assets/email-icon';
import { CheckboxContainer, Footer, FooterComment, Label, MemberContainer } from '../styles';
import LightIcon from '@/assets/light-icon';
import {
	UserType,
	useAgencyMember_SignUpMemberMutation,
	useBusinessMember_SignUpMemberMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import { Controller } from 'react-hook-form';
import { AccesssAgencyMemberItems, AccesssBusinessMemberItemsWithOwner } from '../data';

interface DefaultValuesType {
	name: string;
	email: string;
	isManageBusinessUserAccess: boolean;
	isOpratorAccess: boolean;
	isReportAccess: boolean;
	isSettingsManagmentAccess: boolean;
	isSocialManagmentAccess: boolean;
	isManageAgencyUserAccess: boolean;
	isSubscriptionAccess: boolean;
}

const AddMember = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const { mutate: addBusinessMember } = useBusinessMember_SignUpMemberMutation();
	const { mutate: addAgencyMember } = useAgencyMember_SignUpMemberMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		name: '',
		email: '',
		isManageBusinessUserAccess: true,
		isOpratorAccess: true,
		isReportAccess: true,
		isSettingsManagmentAccess: true,
		isSocialManagmentAccess: true,
		isManageAgencyUserAccess: true,
		isSubscriptionAccess: true,
	};

	const methods = useForm({
		resolver: yupResolver(memberSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		// business add member
		if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
			addBusinessMember(
				{
					input: {
						fullName: values?.name,
						email: values?.email,
						isManageBusinessUserAccess: values?.isManageBusinessUserAccess,
						isOpratorAccess: values?.isOpratorAccess,
						isReportAccess: values?.isReportAccess,
						isSettingsManagmentAccess: values?.isSettingsManagmentAccess,
						isSocialManagmentAccess: values?.isSocialManagmentAccess,
						isSubscriptionAccess: values?.isSubscriptionAccess,
					},
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar(status.description, { variant: 'success' });
							reset();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		} else {
			// agency add member
			addAgencyMember(
				{
					input: {
						email: values?.email,
						fullName: values?.name,
						isManageAgencyUserAccess: values?.isManageAgencyUserAccess,
						isSubscriptionAccess: values?.isSubscriptionAccess,
					},
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar(status.description, { variant: 'success' });
							reset();
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			<MemberContainer>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						{/* -------------------------------fields */}
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label mb={'4px'}>Name</Label>

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
								<Label mb={'4px'}>Email</Label>

								<TextField
									name="email"
									fullWidth
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
					</Stack>

					{/* access members */}
					<Typography fontSize={'16px'} fontWeight={'bold'} color={theme?.palette?.infuuse?.blue200} mt={2}>
						Access Sets{' '}
					</Typography>

					{/* business access member */}
					{CurrentUser?.user?.userType === UserType?.BusinessMember ? (
						<Box
							mt={2}
							width={'100%'}
							display={'flex'}
							justifyContent={'start'}
							alignItems={'center'}
							flexWrap={'wrap'}
							sx={{ gap: '16px 0' }}
						>
							{AccesssBusinessMemberItemsWithOwner?.map((item) => {
								return (
									<Controller
										key={item.value}
										name={item.value}
										render={({ field: { onChange, value } }) => {
											return (
												<CheckboxContainer>
													<Checkbox
														checked={value}
														onChange={(e) => onChange(e.target.checked)}
													/>

													<Typography
														fontWeight={'bold'}
														color={theme?.palette?.common?.white}
													>
														{item.name}
													</Typography>
												</CheckboxContainer>
											);
										}}
									/>
								);
							})}
						</Box>
					) : (
						// agency access member
						<Stack mt={2} width={'100%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
							{AccesssAgencyMemberItems?.map((item) => {
								return (
									<Controller
										key={item.value}
										name={item.value}
										render={({ field: { onChange, value } }) => {
											return (
												<CheckboxContainer>
													<Checkbox
														checked={value}
														onChange={(e) => onChange(e.target.checked)}
													/>

													<Typography
														fontWeight={'bold'}
														color={theme?.palette?.common?.white}
													>
														{item.name}
													</Typography>
												</CheckboxContainer>
											);
										}}
									/>
								);
							})}
						</Stack>
					)}

					{/* ------------------------------- footer */}
					<Footer>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
							<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Add
							</NextButton>
						</Stack>

						{/* <FooterComment direction={'row'}>
							<LightIcon />
							<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
								You can add up to 3 super admins. To add new team members please purchase a subscription
								for them.
							</Label>
						</FooterComment> */}
					</Footer>
				</FormProvider>
			</MemberContainer>
		</Stack>
	);
};

export default AddMember;

// -------------------------------schema
const memberSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Email').trim(),
	isManageBusinessUserAccess: Yup.boolean(),
	isOpratorAccess: Yup.boolean(),
	isReportAccess: Yup.boolean(),
	isSettingsManagmentAccess: Yup.boolean(),
	isSocialManagmentAccess: Yup.boolean(),
	isManageAgencyUserAccess: Yup.boolean(),
});
