import DealIcon from '@/assets/deal-icon';
import { Box, MenuItem, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import { DatePicker, FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import {
	DealStatus,
	useDeal_AddMutation,
	useDeal_EditMutation,
	useDeal_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from 'pages/_app';

interface DefaultValuesType {
	name: string;
	stage: string;
	price: number;
	closeDate: Date;
}

const EditDealSidebar = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();
	const contactId = router?.query?.contactId;

	// -------------------------------state management
	const { dealSidebar, dealId } = useSnapshot(chatStore);

	// -------------------------------query
	// deals
	const { data: Deals } = useDeal_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1,
		where: {
			id: {
				eq: Number(dealId),
			},
		},
	});

	const DealsData = Deals?.deal_getListByContactId?.result;

	// edit deal
	const { mutate: editDeal } = useDeal_EditMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		name: DealsData?.items[0]?.title || '',
		stage: DealsData?.items[0]?.dealStatus || '',
		price: DealsData?.items[0]?.price || 0,
		closeDate: DealsData?.items[0]?.endDate || new Date(),
	};

	const methods = useForm({
		resolver: yupResolver(DealSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		editDeal(
			{
				dealId: Number(dealId),
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
						ExitDealhandeler();
						queryClient.refetchQueries(['deal_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	// -------------------------------functions

	const ExitDealhandeler = () => {
		chatStore.dealSidebar = false;
		chatStore.dealId = null;
	};

	return (
		<Stack width={'360px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={2} borderRadius={2}>
			<Stack>
				{/* -------------------------------header */}
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<DealIcon />
					<Box onClick={ExitDealhandeler} sx={{ cursor: 'pointer' }}>
						<CloseIconBox />
					</Box>
				</Stack>
				<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={3} mb={3}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'20px'}>
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
								Save
							</NextButton>
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditDealSidebar;

// -------------------------------schema
const DealSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name'),
	stage: Yup.string().required('Enter Your Stage'),
	price: Yup.number().required('Enter Your Price'),
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
