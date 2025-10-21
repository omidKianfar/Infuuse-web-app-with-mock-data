import { InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import {
	PackageDuration,
	SortEnumType,
	useAgency_GetListByAdminQuery,
	usePayment_CreateCustomPackageMutation,
} from '@/graphql/generated';
import { Footer, Label, MemberContainer } from '../../../styles';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import { FormProvider, useForm, Yup, yupResolver, TextField } from '@/components/atoms/Form';


interface DefaultValuesType {
	agencyId: string;
	numberOfUsers: string;
	planType: string;
	price: string;
}

const EditSubscriptionAgency = () => {
	// -------------------------------query
	// agency member query
	const { data: Agents } = useAgency_GetListByAdminQuery({
		skip: 0,
		take: 1000,
		order: {
			agency: {
				createdDate: SortEnumType?.Desc,
			},
		},
	});
	const AgentsList = Agents?.agency_getListByAdmin?.result;

	const { mutate: createPayment } = usePayment_CreateCustomPackageMutation()

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		agencyId: '',
		numberOfUsers: '',
		planType: '',
		price: ''
	};

	const methods = useForm({
		resolver: yupResolver(adminSubscriptionSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		createPayment(
			{
				input: {
					packageDuration: values?.planType,
					operatorCount: Number(values?.numberOfUsers),
					totalPrice: Number(values?.price),
					businessId: null,
					agencyId: Number(values?.agencyId)
				},
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
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
			<MemberContainer sx={{height:'100%'}}>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label mb={'4px'}>Choose A Plan</Label>

								<TextField name="planType" fullWidth select>
									{PaymentData?.map((item) => (
										<MenuItem key={item?.value} value={item?.value}>
											<Typography>{item?.name}</Typography>
										</MenuItem>
									))}
								</TextField>
							</Stack>

							<Stack width={'50%'}>
								<Label mb={'4px'}>Number Of Users</Label>

								<TextField
									name="numberOfUsers"
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
						</Stack>

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} >
							<Stack width={'50%'}>
								<Label mb={'4px'}>Agency</Label>

								<TextField
									name="agencyId"
									fullWidth
									select
									// InputProps={{
									// 	startAdornment: (
									// 		<InputAdornment position="start">
									// 			<BusinessIcon />
									// 		</InputAdornment>
									// 	),
									// }}
								>
									{AgentsList?.items?.map((item) => (
										<MenuItem key={item?.agency?.id} value={item?.agency?.id} >
											<Typography>{item?.agencyOwner?.email}</Typography>
										</MenuItem>
									))}
								</TextField>
							</Stack>

							<Stack width={'50%'} >
								<Label mb={'4px'}>Price</Label>
								<TextField
									name="price"
									fullWidth
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>,
									}}
								/>
							</Stack>
						</Stack>

					</Stack>

					{/* ------------------------------- footer */}
					<Footer>
						<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} px={2}>
							<NextButton type='submit' sx={{ width: '278px', fontSize: '16px', fontWeight: 600 }}>
								Edit Subscription
							</NextButton>
						</Stack>
					</Footer>
				</FormProvider>

			</MemberContainer>

		</Stack>
	);
};

export default EditSubscriptionAgency;

const PaymentData = [
	{ name: 'One Month', value: PackageDuration?.OneMonth },
	{ name: 'Three Month', value: PackageDuration?.ThreeMonth },
	{ name: 'Six Month', value: PackageDuration?.SixMonth },
	{ name: 'One Year', value: PackageDuration?.Year },
	{ name: 'Life Time', value: PackageDuration?.LifeTime },
];

// -------------------------------schema
const adminSubscriptionSchema = Yup.object().shape({
	agencyId: Yup.string().required('Enter Your Agency'),
	price: Yup.string().required('Enter Your Price'),
	numberOfUsers: Yup.string().required('Enter Your Number Of Users'),
	planType: Yup.string().required('Enter Your Plan Type'),
});
