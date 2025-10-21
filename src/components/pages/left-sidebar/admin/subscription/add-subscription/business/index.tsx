import { InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { NextButton } from '@/components/atoms/Button';
import UserIcon from '@/assets/user-icon';
import {
	PackageDuration,
	SortEnumType,
	useBusiness_GetListByAdminQuery,
	usePayment_CreateCustomPackageMutation,
} from '@/graphql/generated';
import { Footer, Label, MemberContainer } from '../../styles';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import BusinessIcon from '@/assets/business-icon';
import { FormProvider, useForm, Yup, yupResolver, TextField } from '@/components/atoms/Form';


interface DefaultValuesType {
	businessId: string;
	numberOfUsers: string;
	planType: string;
	price: string;
}

const AddSubscriptionBusiness = () => {
	// -------------------------------query
	// business member query
	const { data: BusinessOwners } = useBusiness_GetListByAdminQuery({
		skip: 0,
		take: 10000,

		order: {
			business: {
				createdDate: SortEnumType?.Desc,
			},
		},
	});
	const BusinessOwnersList = BusinessOwners?.business_getListByAdmin?.result;

	const { mutate: createPayment } = usePayment_CreateCustomPackageMutation()

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		businessId: '',
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
		console.log('values', values);

		createPayment(
			{
				input: {
					packageDuration: values?.planType,
					operatorCount: Number(values?.numberOfUsers),
					totalPrice: Number(values?.price),
					businessId: Number(values?.businessId),
					agencyId: null
				},
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						reset()
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
								<Label mb={'4px'}>Business</Label>

								<TextField
									name="businessId"
									fullWidth
									select
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<BusinessIcon />
											</InputAdornment>
										),
									}}
								>
									{BusinessOwnersList?.items?.map((item) => (
										<MenuItem key={item?.business?.id} value={item?.business?.id} >
											<Typography>{item?.businessOwner?.email}</Typography>
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
								Add Subscription
							</NextButton>
						</Stack>
					</Footer>
				</FormProvider>

			</MemberContainer>

		</Stack>
	);
};

export default AddSubscriptionBusiness;

const PaymentData = [
	{ name: 'One Month', value: PackageDuration?.OneMonth },
	{ name: 'Three Month', value: PackageDuration?.ThreeMonth },
	{ name: 'Six Month', value: PackageDuration?.SixMonth },
	{ name: 'One Year', value: PackageDuration?.Year },
	{ name: 'Life Time', value: PackageDuration?.LifeTime },
];

// -------------------------------schema
const adminSubscriptionSchema = Yup.object().shape({
	businessId: Yup.string().required('Enter Your Business'),
	price: Yup.string().required('Enter Your Price'),
	numberOfUsers: Yup.string().required('Enter Your Number Of Users'),
	planType: Yup.string().required('Enter Your Plan Type'),
});
