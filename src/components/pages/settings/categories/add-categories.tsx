import { MenuItem, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BusinessContainer, Label } from './styles';
import {
	UserType,
	useBusiness_GetListAgencyRequestsQuery,
	useCategory_AddMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';

interface DefaultValueProps {
	name: string;
	business: string;
}

const AddCategory = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	// add category
	const { mutate: addCategory } = useCategory_AddMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		name: '',
		business: '',
	};

	const methods = useForm({
		resolver: yupResolver(
			CurrentUser?.user?.userType === UserType?.BusinessMember ? businessCategorySchema : agencyCategorySchema
		),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		addCategory(
			{
				businessId:
					CurrentUser?.user?.userType === UserType?.BusinessMember
						? Number(CurrentUser?.businessAccesses[0]?.business?.id)
						: Number(values?.business),
				input: {
					name: values?.name,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
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
			<BusinessContainer>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						{/* -------------------------------fields */}
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label>Name</Label>

								<TextField name="name" fullWidth />
							</Stack>
							{CurrentUser?.user?.userType === UserType?.AgencyMember && (
								<Stack width={'50%'}>
									<Label>Business</Label>

									<TextField name="business" fullWidth select>
										{BusinessRequestsData?.items?.map((business) => (
											<MenuItem key={business?.business?.id} value={business?.business?.id}>
												{business?.business?.name}
											</MenuItem>
										))}
									</TextField>
								</Stack>
							)}
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
			</BusinessContainer>
		</Stack>
	);
};

export default AddCategory;

// -------------------------------agency schema
const agencyCategorySchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	business: Yup.string().required('Enter Your Business'),
});

// -------------------------------business schema
const businessCategorySchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
});
