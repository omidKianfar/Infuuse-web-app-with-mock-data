import { MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BusinessContainer, Label } from './styles';
import {
	SortEnumType,
	UserType,
	useBusiness_GetListAgencyRequestsQuery,
	useCategory_GetListQuery,
	useTemplate_AddMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import SlateEditor from '@/components/atoms/slatejs-editor';

interface DefaultValueProps {
	title: string;
	category: number;
}

const AddTemplates = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------states
	const [BusinessId, setBusinessId] = useState<number>(Number(CurrentUser?.businessAccesses[0]?.business?.id));
	const [Content, setContent] = useState('');

	// -------------------------------query
	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	// get categories
	const { data: Categories } = useCategory_GetListQuery({
		businessId:
			CurrentUser?.user?.userType === UserType?.BusinessMember
				? Number(CurrentUser?.businessAccesses[0]?.business?.id)
				: Number(BusinessId),
		skip: 0,
		take: 10000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const CategoriesData = Categories?.category_getList?.result;

	// add template
	const { mutate: addTemplate } = useTemplate_AddMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		title: '',
		category: BusinessRequestsData?.items[0]?.id as number,
	};

	const methods = useForm({
		resolver: yupResolver(templateSchema),
		values: defaultValues,
	});

	const { handleSubmit, getValues, reset } = methods;

	const onSubmit = (values: any) => {
		addTemplate(
			{
				categoryId: Number(values?.category),
				input: {
					title: values?.title,
					content: Content,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						setContent('');
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
						<Stack direction={'row'} justifyContent={'start'} alignItems={'start'} spacing={2}>
							{CurrentUser?.user?.userType === UserType?.AgencyMember && (
								<Stack width={'50%'}>
									<Label>Business</Label>

									<TextField name="business" fullWidth select value={BusinessId}>
										{BusinessRequestsData?.items?.map((business) => (
											<MenuItem
												key={business?.business?.id}
												value={business?.business?.id}
												onClick={() => setBusinessId(Number(business?.business?.id))}
											>
												{business?.business?.name}
											</MenuItem>
										))}
									</TextField>
								</Stack>
							)}
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
						<Stack>
							<Stack width={'50%'}>
								<Label>Title</Label>

								<TextField name="title" fullWidth />
							</Stack>

							<Label>Write A Message</Label>

							<SlateEditor editorOutput={Content} setEditorOutput={setContent} />
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

export default AddTemplates;

// -------------------------------template schema
const templateSchema = Yup.object().shape({
	title: Yup.string().required('Enter Your Title').trim(),
	category: Yup.number().required('Enter Your Category'),
});
