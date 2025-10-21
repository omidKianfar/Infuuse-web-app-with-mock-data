import { NextButton } from '@/components/atoms/Button';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import CloseIconBox from '@/assets/close-icon-box';
import { TwilioPhoneNumber, useTwilio_EditPhoneNumberMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface DefaultValueProps {
	phoneNumber: string;
}

interface Props {
	handleClose: () => void;
	TwilioNumber: TwilioPhoneNumber;
}

const EditTwilioNumbersModal = ({ handleClose, TwilioNumber }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// ------------------------------- query
	const { mutate: editTwilioNumber } = useTwilio_EditPhoneNumberMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		phoneNumber: TwilioNumber?.phoneNumber as string,
	};

	const methods = useForm({
		resolver: yupResolver(TwilioNumberSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		editTwilioNumber(
			{
				twilioPhoneNumberId: Number(TwilioNumber?.id),
				input: {
					phoneNumber: values?.phoneNumber as string,
				},
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.invalidateQueries(['Twilio_getListPhoneNumber']);
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
					Edit Twilio Number
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
						Save
					</NextButton>
				</Stack>
			</FormProvider>
		</Stack>
	);
};

export default EditTwilioNumbersModal;

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
