import { MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BusinessContainer, Label } from './styles';
import {
	UserType,
	useBusiness_GetListAgencyRequestsQuery,
	useCategory_GetListQuery,
	useTagCategory_AddMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';

interface DefaultValueProps {
	name: string;
	category: number;
}

const AddTag = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------state
	const [BusinessId, setBusinessId] = useState(CurrentUser?.businessAccesses?.[0]?.business?.id);

	// -------------------------------query
	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	// get categories
	const { data: Categories } = useCategory_GetListQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 10000,
	});
	const CategoriesData = Categories?.category_getList?.result;

	// get tag
	const { mutate: addTag } = useTagCategory_AddMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		name: '',
		category: CategoriesData?.items[0]?.id as number,
	};

	const methods = useForm({
		resolver: yupResolver(TagSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		addTag(
			{
				categoryId: Number(values?.category),
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
							{CurrentUser?.user?.userType === UserType?.AgencyMember && (
								<Stack width={'50%'}>
									<Label>Business</Label>

									<TextField name="business" fullWidth select value={BusinessId}>
										{BusinessRequestsData?.items?.map((business) => (
											<MenuItem
												key={business?.business?.id}
												value={business?.business?.id}
												onClick={() => setBusinessId(business?.business?.id)}
											>
												{business?.business?.name}
											</MenuItem>
										))}
									</TextField>
								</Stack>
							)}
						</Stack>

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label>Name</Label>

								<TextField name="name" fullWidth />
							</Stack>

							<Stack width={'50%'}>
								<Label>Category</Label>

								<TextField name="category" fullWidth select>
									{CategoriesData?.items?.map((category) => (
										<MenuItem key={category?.id} value={category?.id}>
											{category?.name}
										</MenuItem>
									))}
								</TextField>
							</Stack>
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

export default AddTag;

// -------------------------------tag schema
const TagSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
	category: Yup.number().required('Enter Your Category'),
});
