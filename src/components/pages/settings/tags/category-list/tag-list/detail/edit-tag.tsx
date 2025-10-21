import { Stack } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BusinessContainer, Label } from '../../../styles';
import { useTagCategory_EditMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface DefaultValueProps {
	name: string;
}

const EditTag = () => {
	const router = useRouter();

	const TagId = router?.query?.tagId;
	const TagName = router?.query?.tagName;

	// -------------------------------query
	const { mutate: editTag } = useTagCategory_EditMutation();

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		name: TagName as string,
	};

	const methods = useForm({
		resolver: yupResolver(TagSchema),
		values: defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = (values: any) => {
		editTag(
			{
				tagCategoryId: Number(TagId),
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
		<Stack width={'100%'} height={'100%'} p={2}>
			<BusinessContainer sx={{ height: '100vh' }}>
				{/* -------------------------------form */}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack position={'relative'}>
						{/* -------------------------------fields */}
						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
							<Stack width={'50%'}>
								<Label>Name</Label>
								<TextField name="name" fullWidth />
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

export default EditTag;

// -------------------------------schema
const TagSchema = Yup.object().shape({
	name: Yup.string().required('Enter Your Name').trim(),
});
