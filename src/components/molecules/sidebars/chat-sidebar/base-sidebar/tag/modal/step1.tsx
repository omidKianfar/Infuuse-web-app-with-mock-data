import { Box, MenuItem, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import AddIcon from '@/assets/add-icon';
import CloseIconBox from '@/assets/close-icon-box';
import { useRouter } from 'next/router';
import {
	useBusiness_GetByBusinessIdQuery,
	useCategory_GetListQuery,
	useTagCategory_AddMutation,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';

interface DefaultValuesType {
	business: string;
	category: string;
	tag: string;
}

interface Props {
	handleClose: () => void;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Step1 = ({ handleClose, setCounter }: Props) => {
	// ------------------------------- tools
	const theme = useTheme();
	const router = useRouter();

	const BusinessId = router?.query?.businessId;

	const { data: Business } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(BusinessId),
	});

	const { data: category } = useCategory_GetListQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 10000,
	});

	const CategoryData = category?.category_getList?.result;

	const { mutate: addTag } = useTagCategory_AddMutation();

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		business: Business?.business_getByBusinessId?.result?.name || '',
		category: '',
		tag: '',
	};

	const methods = useForm({
		resolver: yupResolver(AddTagSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		addTag(
			{
				categoryId: Number(values?.category),
				input: {
					name: values?.tag,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						queryClient.refetchQueries(['tagCategory_getListByBusinessId']);
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
					Create New Tag
				</Typography>
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					onClick={handleClose}
					sx={{ cursor: 'pointer' }}
				>
					<CloseIconBox />
				</Box>
			</Stack>

			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Stack width={'100%'}>
					<TextField name="business" fullWidth disabled />

					<Label mb={'4px'}>Category</Label>

					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
						<TextField name="category" fullWidth select>
							{CategoryData?.items?.map((category) => (
								<MenuItem key={category?.id} value={category?.id}>
									<Typography>{category?.name}</Typography>
								</MenuItem>
							))}
						</TextField>

						<Box onClick={() => setCounter(1)} sx={{ cursor: 'pointer' }} mb={'4px'} ml={1}>
							<AddIcon width="32px" height="32px" />
						</Box>
					</Stack>
				</Stack>

				<Stack width={'100%'}>
					<Label mb={'4px'}>Tag Name</Label>

					<TextField name="tag" fullWidth />
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

export default Step1;

// -------------------------------schema
const AddTagSchema = Yup.object().shape({
	category: Yup.string().required('Enter Your Category'),
	tag: Yup.string().required('Enter Your Tag'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));
