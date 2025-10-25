import DealIcon from '@/assets/deal-icon';
import { Box, MenuItem, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import { DatePicker, FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { DealStatus, useDeal_AddMutation } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';

interface DefaultValuesType {
	name: string;
	stage: string;
	price: number;
	closeDate: Date;
}

const AddDealSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;

	const { dealSidebar, dealId } = useSnapshot(chatStore);

	const { mutate: addDeal } = useDeal_AddMutation();

	const defaultValues: DefaultValuesType = {
		name: '',
		stage: '',
		price: 0,
		closeDate: new Date(),
	};

	const methods = useForm({
		resolver: yupResolver(DealSchema),
		defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		addDeal(
			{
				contactId: Number(contactId),
				input: {
					dealStatus: values?.stage,
					endDate: values?.closeDate,
					title: values?.name,
					price: values?.price,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						reset();
						ExitDealhandeler();
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};


	const ExitDealhandeler = () => {
		chatStore.dealSidebar = false;
		chatStore.dealId = null;
	};

	return (
		<Stack width={'360px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={2} borderRadius={2}>
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<DealIcon />
					<Box onClick={ExitDealhandeler} sx={{ cursor: 'pointer' }}>
						<CloseIconBox />
					</Box>
				</Stack>
				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={3} mb={3}>
					<Typography fontWeight={'bold'} fontSize={'20px'}>
						Deal
					</Typography>
				</Stack>

				<Stack>
					{/* -------------------------------form */}
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						{/* -------------------------------fields */}
						<Stack>
							<Label mb={'4px'}>Deal Name</Label>

							<TextField name="name" fullWidth />
						</Stack>

						<Stack>
							<Label mb={'4px'}>Deal Stage</Label>

							<TextField name="stage" fullWidth select>
								{stageData?.map((deal) => (
									<MenuItem key={deal?.value} value={deal?.value}>
										<Typography>{deal?.name}</Typography>
									</MenuItem>
								))}
							</TextField>
						</Stack>

						<Stack>
							<Label mb={'4px'}>Price ($)</Label>

							<TextField name="price" fullWidth type="number"></TextField>
						</Stack>

						<Stack>
							<Label mb={'4px'}>Close Date</Label>
							<DatePicker name="closeDate" label={''} />
						</Stack>

						{/* ------------------------------- footer */}
						<Stack width={'100%'} direction={'row'} alignItems={'center'} mt={'50px'}>
							<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
								Add
							</NextButton>{' '}
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default AddDealSidebar;

const DealSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name'),
	stage: Yup.string().required('Enter Your Stage'),
	price: Yup.number().required('Enter Your Price').max(99999, 'Maximum number is 999999'),
	closeDate: Yup.date().required('Enter Your Close Date'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

const stageData = [
	{ name: 'Lead', value: DealStatus?.Lead },
	{ name: 'Close Won', value: DealStatus?.ClosedWon },
	{ name: 'Appointment Scheduled', value: DealStatus?.AppointmentScheduled },
];
