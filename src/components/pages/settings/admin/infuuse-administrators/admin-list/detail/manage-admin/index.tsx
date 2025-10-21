import { InputAdornment, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import EmailIcon from '@/assets/email-icon';
import { useRouter } from 'next/router';
import { Label, MemberContainer } from '../../../styles';

interface DefaultValuesType {
	name: string;
	email: string;
}

const ManageAdmin = () => {
	// -------------------------------tools
	const theme: any = useTheme();
	const router = useRouter();

	// ------------------------------- query
	// business member query
	// const { data: BusinessMembers, refetch } = useBusinessMember_GetListQuery({
	// 	skip: 0,
	// 	take: 1,
	// 	where: {
	// 		id: {
	// 			eq: Number(MemberId),
	// 		},
	// 	},
	// });
	// const BusinessMemberList: BusinessMember = BusinessMembers?.businessMember_getList?.result
	// 	?.items?.[0] as BusinessMember;

	// // user update mutation
	// const { mutate: UpdateUser } = useBusinessMember_EditMutation();

	// -------------------------------form

	const defaultValues: DefaultValuesType = {
		name: '',
		email: '',
	};

	const methods = useForm({
		resolver: yupResolver(memberSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		// UpdateUser(
		// 	{
		// 		input: {
		// 			email: null,
		// 			fullName: values?.name,
		// 			isManageBusinessUserAccess: values?.isManageBusinessUserAccess,
		// 			isSettingsManagmentAccess: values?.isSettingsManagmentAccess,
		// 			isOpratorAccess: values?.isOpratorAccess,
		// 			isSocialManagmentAccess: values?.isSocialManagmentAccess,
		// 			isReportAccess: values?.isReportAccess,
		// 		},
		// 		businessMemberId: Number(MemberId),
		// 	},
		// 	{
		// 		onSuccess: (data) => {
		// 			const { status } = responseDestructure(data);
		// 			if (status.code == 1) {
		// 				refetch();
		// 				enqueueSnackbar(status.description, { variant: 'success' });
		// 			} else {
		// 				enqueueSnackbar(status.description, { variant: 'error' });
		// 			}
		// 		},
		// 	}
		// );
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

export default ManageAdmin;

// -------------------------------schema
const memberSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Name').trim(),
});
