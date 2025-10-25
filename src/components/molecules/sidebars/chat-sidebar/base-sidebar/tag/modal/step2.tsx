import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import { useRouter } from 'next/router';
import { useBusiness_GetByBusinessIdQuery, useCategory_AddMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface Props {
	setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Step2 = ({ setCounter }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const BusinessId = router?.query?.businessId;

	const { data: Business } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(BusinessId),
	});

	const { mutate: addCategory } = useCategory_AddMutation();

	const defaultValues = {
		business: Business?.business_getByBusinessId?.result?.name,
		category: '',
	};

	const methods = useForm({
		resolver: yupResolver(AddTagSchema),
		defaultValues,
	});

	const { handleSubmit, getValues, setValue } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		addCategory(
			{
				businessId: Number(BusinessId),
				input: {
					name: values?.category,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						setCounter(0);
						queryClient.refetchQueries(['category_getList']);
						enqueueSnackbar(status.description, { variant: 'success' });
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack width={'400px'} height={'100%'} borderRadius={2} bgcolor={theme?.palette?.infuuse?.gray200} p={2}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontSize={'16px'} fontWeight={'bold'}>
					Create New Category
				</Typography>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					onClick={() => setCounter(0)}
					sx={{ cursor: 'pointer' }}
				>
					<CloseIconBox />
				</Box>
			</Stack>

			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack width={'100%'}>
					<Label mb={'4px'}>Business</Label>

					<TextField name="business" fullWidth disabled />
				</Stack>

				<Stack width={'100%'}>
					<Label mb={'4px'}>Category Name</Label>

					<TextField name="category" fullWidth />
				</Stack>
				{/* ------------------------------- footer */}
				<Stack width={'100%'} direction={'row'} alignItems={'center'} mt={'50px'}>
					<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
						Add
					</NextButton>
				</Stack>
			</FormProvider>
		</Stack>
	);
};

export default Step2;

const AddTagSchema = Yup.object().shape({
	business: Yup.string().required('Enter Your Business'),
	category: Yup.string().required('Enter Your Category'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
