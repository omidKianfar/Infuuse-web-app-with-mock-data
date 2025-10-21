import { NextButton } from '@/components/atoms/Button';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import CloseIconBox from '@/assets/close-icon-box';
import { useTwilio_AddPhoneNumberMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface Props {
	handleClose: () => void;
}

const AddTwilioNumbersModal = ({ handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// ------------------------------- query
	const { mutate: AddTwilioNumber } = useTwilio_AddPhoneNumberMutation();

	// -------------------------------form
	const defaultValues = {
		phoneNumber: '',
	};

	const methods = useForm({
		resolver: yupResolver(TwilioNumberSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		AddTwilioNumber(
			{
				input: {
					phoneNumber: values?.phoneNumber as string,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						queryClient.invalidateQueries(['Twilio_getListPhoneNumber']);
						enqueueSnackbar(status.description, { variant: 'success' });
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
		<Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={'24px'} borderRadius={2}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} mb={2}>
				<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500}>
					Add Twilio Number
				</Typography>

				<Box
					display={'flex'}
					justifyContent={'end'}
					alignItems={'center'}
					sx={{ cursor: 'pointer' }}
					onClick={handleClose}
				>
					<CloseIconBox />
				</Box>
			</Stack>

			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<NextButton onClick={handleClose} sx={{ width: '150px' }}>
						Cancel
					</NextButton>

					<NextButton type="submit" sx={{ width: '150px' }}>
						Add
					</NextButton>
				</Stack>
			</FormProvider>
		</Stack>
	);
};

export default AddTwilioNumbersModal;

// -------------------------------schema
const TwilioNumberSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.matches(/^\+\d{8,14}$/, 'Phone number must start with + and be between 9 to 15 digits long')
		.required('Enter Your Phone Number'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
