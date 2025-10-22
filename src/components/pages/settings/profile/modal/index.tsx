import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { Label } from '../../businesses/styles';
import { useUser_ChangePasswordMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';

interface Props {
	handleClose: () => void;
}

interface DefaultValueProps {
	currentPassword: string;
	newPassword: string;
}

const ChangePasswordModal = ({ handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------query

	const { mutate: ChangePassword } = useUser_ChangePasswordMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		currentPassword: '',
		newPassword: '',
	};

	const methods = useForm({
		resolver: yupResolver(UpdatePasswordSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		ChangePassword(
			{
				currentPassword: values?.currentPassword,
				newPassword: values?.newPassword,
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						enqueueSnackbar(status.description, { variant: 'success' });
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack bgcolor={theme?.palette?.infuuse?.gray200} p={2} borderRadius={4} width={'400px'}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'16px'}>
					Change Password
				</Typography>

				<Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
					<CloseIconBox />
				</Box>
			</Stack>

			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack>
					<Label>Current Password</Label>

					<TextField name="currentPassword" fullWidth />
				</Stack>

				<Stack>
					<Label>New Password</Label>

					<TextField name="newPassword" fullWidth />
				</Stack>

				<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600, mt: 4 }}>
					Save
				</NextButton>
			</FormProvider>
		</Stack>
	);
};

export default ChangePasswordModal;

// -------------------------------schema
const UpdatePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string().required('Enter Your Current Password'),
	newPassword: Yup.string().required('Enter Your New Password'),
});
