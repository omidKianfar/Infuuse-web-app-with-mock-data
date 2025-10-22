import CloseIconBox from '@/assets/close-icon-box';
import {
	SortEnumType,
	useBusiness_SetTwilioPhoneNumberMutation,
	useTwilio_GetListPhoneNumberQuery,
} from '@/graphql/generated';
import { Box, MenuItem, Stack, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface DefaultValuesType {
	phoneNumberId: string;
}

interface Props {
	handleClose: () => void;
	businessId: number | undefined;
}

const AddCallBusinessNumberModal = ({ handleClose, businessId }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	// -------------------------------query
	const { data: twilioNumbers } = useTwilio_GetListPhoneNumberQuery({
		skip: 0,
		take: 10000,
		where: {
			isSold: {
				eq: false,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const { mutate: setTwilioNumberForBusiness } = useBusiness_SetTwilioPhoneNumberMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		phoneNumberId: '',
	};

	const methods = useForm({
		resolver: yupResolver(businessPhoneNumberSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = async (values: any) => {
		setTwilioNumberForBusiness(
			{
				businessId: Number(businessId),
				twilioPhoneNumberId: Number(values?.phoneNumberId),
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose();
						queryClient.invalidateQueries(['user_getCurrentUser']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
		handleClose();
	};
	return (
		<Stack
			width={isMobile ? '95vw' : '400px'}
			height={'100%'}
			bgcolor={theme?.palette?.infuuse?.gray200}
			borderRadius={2}
			p={2}
			boxShadow={4}
		>
			<Stack position={'relative'} width={'100%'} height={'100%'}>
				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mb={2}>
					<Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
						<CloseIconBox />
					</Box>
				</Stack>

				<Stack>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						<Stack>
							<Label>Select Business Phone Number</Label>
							<TextField name="phoneNumberId" fullWidth select disabled>
								{twilioNumbers?.Twilio_getListPhoneNumber?.result?.items?.map((twilioPhoneNumber) => (
									<MenuItem key={twilioPhoneNumber?.id} value={twilioPhoneNumber?.id}>
										<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
											<Typography>{twilioPhoneNumber?.phoneNumber}</Typography>
										</Stack>
									</MenuItem>
								))}
							</TextField>
						</Stack>

						<Stack
							mt={4}
							width={'100%'}
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<NextButton
								disabled
								sx={{ width: '150px', fontSize: '16px', fontWeight: 600 }}
								onClick={handleClose}
							>
								Cancel
							</NextButton>

							<NextButton
								type="submit"
								sx={{ width: '150px', fontSize: '16px', fontWeight: 600 }}
								disabled
							>
								Save
							</NextButton>
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AddCallBusinessNumberModal;

// -------------------------------schema
const businessPhoneNumberSchema = Yup.object().shape({
	phoneNumberId: Yup.string().required('Select Your Phone Number'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
