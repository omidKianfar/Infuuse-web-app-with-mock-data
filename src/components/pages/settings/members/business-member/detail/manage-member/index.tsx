import { Box, Checkbox, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import EmailIcon from '@/assets/email-icon';
import BusinessIcon from '@/assets/business-icon';
import {
	BusinessMember,
	useBusinessMember_EditMutation,
	useBusinessMember_GetListQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { CheckboxContainer, Label, MemberContainer } from '../../../styles';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { Controller } from 'react-hook-form';
import { AccesssBusinessMemberItemsWithMember, AccesssBusinessMemberItemsWithOwner } from '../../../data';

interface DefaultValuesType {
	name: string;
	email: string;
	business: string;
	isManageBusinessUserAccess: boolean;
	isOpratorAccess: boolean;
	isReportAccess: boolean;
	isSettingsManagmentAccess: boolean;
	isSocialManagmentAccess: boolean;
	isSubscriptionAccess: boolean;
}

const ManageMembers = () => {
	// -------------------------------tools
	const theme: any = useTheme();
	const router = useRouter();

	const MemberId = router?.query?.memberId;

	// ------------------------------- query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// business member query
	const { data: BusinessMembers, refetch } = useBusinessMember_GetListQuery({
		skip: 0,
		take: 1,
		where: {
			id: {
				eq: Number(MemberId),
			},
		},
	});
	const BusinessMemberList: BusinessMember = BusinessMembers?.businessMember_getList?.result
		?.items?.[0] as BusinessMember;

	// user update mutation
	const { mutate: UpdateUser } = useBusinessMember_EditMutation();

	// -------------------------------form

	const defaultValues: DefaultValuesType = {
		name: BusinessMemberList?.fullName || '',
		email: BusinessMemberList?.email || '',
		business: BusinessMemberList?.business?.name || '',
		isManageBusinessUserAccess: BusinessMemberList?.isManageBusinessUserAccess || false,
		isOpratorAccess: BusinessMemberList?.isOpratorAccess || false,
		isReportAccess: BusinessMemberList?.isReportAccess || false,
		isSettingsManagmentAccess: BusinessMemberList?.isSettingsManagmentAccess || false,
		isSocialManagmentAccess: BusinessMemberList?.isSocialManagmentAccess || false,
		isSubscriptionAccess: BusinessMemberList?.isSubscriptionAccess || false,
	};

	const methods = useForm({
		resolver: yupResolver(memberSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		UpdateUser(
			{
				input: {
					email: null,
					fullName: values?.name,
					isManageBusinessUserAccess: values?.isManageBusinessUserAccess,
					isSettingsManagmentAccess: values?.isSettingsManagmentAccess,
					isOpratorAccess: values?.isOpratorAccess,
					isSocialManagmentAccess: values?.isSocialManagmentAccess,
					isReportAccess: values?.isReportAccess,
					isSubscriptionAccess: values?.isSubscriptionAccess,
				},
				businessMemberId: Number(MemberId),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						refetch();
						enqueueSnackbar(status.description, { variant: 'success' });
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
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
								<Label>Name</Label>

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
								<Label>Email</Label>

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
							<Stack width={'50%'}>
								<Label>Business</Label>

								<TextField
									name="business"
									disabled
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<BusinessIcon />
											</InputAdornment>
										),
									}}
								></TextField>
							</Stack>
						</Stack>
					</Stack>

					{/* ------------------------------- access */}
					<Stack>
						<Typography
							fontSize={'16px'}
							fontWeight={'bold'}
							color={theme?.palette?.infuuse?.blue200}
							mt={2}
						>
							Access Sets{' '}
						</Typography>

						<Box
							mt={2}
							width={'100%'}
							display={'flex'}
							justifyContent={'start'}
							alignItems={'center'}
							flexWrap={'wrap'}
							sx={{ gap: '16px 0' }}
						>
							{CurrentUser?.isBusinessOwner
								? AccesssBusinessMemberItemsWithOwner?.map((item) => {
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
								  })
								: AccesssBusinessMemberItemsWithMember?.map((item) => {
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
			</MemberContainer>
		</Stack>
	);
};

export default ManageMembers;

// -------------------------------schema
const memberSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Name').trim(),
	business: Yup.string(),
	isManageBusinessUserAccess: Yup.boolean(),
	isOpratorAccess: Yup.boolean(),
	isReportAccess: Yup.boolean(),
	isSettingsManagmentAccess: Yup.boolean(),
	isSocialManagmentAccess: Yup.boolean(),
	isSubscriptionAccess: Yup.boolean(),
});
