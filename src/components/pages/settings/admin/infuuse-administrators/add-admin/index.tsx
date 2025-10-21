import { InputAdornment, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import EmailIcon from '@/assets/email-icon';
import { Footer, Label, MemberContainer } from '../styles';

interface DefaultValuesType {
	name: string;
	email: string;
}

const AddAdmin = () => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------query
	// current user
	// const { data: User } = useUser_GetCurrentUserQuery();
	// const CurrentUser = User?.user_getCurrentUser?.result;

	// const { mutate: addBusinessMember } = useBusinessMember_SignUpMemberMutation();
	// const { mutate: addAgencyMember } = useAgencyMember_SignUpMemberMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		name: '',
		email: '',
	};

	const methods = useForm({
		resolver: yupResolver(adminSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		// business add member
		// if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
		// 	addBusinessMember(
		// 		{
		// 			input: {
		// 				fullName: values?.name,
		// 				email: values?.email,
		// 				isManageBusinessUserAccess: values?.isManageBusinessUserAccess,
		// 				isOpratorAccess: values?.isOpratorAccess,
		// 				isReportAccess: values?.isReportAccess,
		// 				isSettingsManagmentAccess: values?.isSettingsManagmentAccess,
		// 				isSocialManagmentAccess: values?.isSocialManagmentAccess,
		// 			},
		// 		},
		// 		{
		// 			onSuccess: (data) => {
		// 				const { status } = responseDestructure(data);
		// 				if (status.code == 1) {
		// 					enqueueSnackbar(status.description, { variant: 'success' });
		// 					reset();
		// 				} else {
		// 					enqueueSnackbar(status.description, { variant: 'error' });
		// 				}
		// 			},
		// 		}
		// 	);
		// } else {
		// 	// agency add member
		// 	addAgencyMember(
		// 		{
		// 			input: {
		// 				email: values?.email,
		// 				fullName: values?.name,
		// 				isManageAgencyUserAccess: values?.isManageAgencyUserAccess,
		// 			},
		// 		},
		// 		{
		// 			onSuccess: (data) => {
		// 				const { status } = responseDestructure(data);
		// 				if (status.code == 1) {
		// 					enqueueSnackbar(status.description, { variant: 'success' });
		// 					reset();
		// 				} else {
		// 					enqueueSnackbar(status.description, { variant: 'error' });
		// 				}
		// 			},
		// 		}
		// 	);
		// }
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

					{/* ------------------------------- footer */}
					<Footer>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
							<NextButton type="submit" sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Add
							</NextButton>
						</Stack>
					</Footer>
				</FormProvider>
			</MemberContainer>
		</Stack>
	);
};

export default AddAdmin;

// -------------------------------schema
const adminSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	email: Yup.string().email().required('Enter Your Email').trim(),
});
