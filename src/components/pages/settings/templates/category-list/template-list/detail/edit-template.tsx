import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { useTemplate_EditMutation, useTemplate_GetListByCategoryIdQuery } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { BusinessContainer, Label } from '../../../styles';
import { useRouter } from 'next/router';
import SlateEditor from '@/components/atoms/slatejs-editor';

interface DefaultValueProps {
	title: string;
}

const EditTemplate = () => {
	// -------------------------------toolbar
	const router = useRouter();
	// -------------------------------address bar router query
	const CategoryId = router?.query?.categoryId;
	const TemplateId = router?.query?.templateId;

	// -------------------------------query
	// get categories
	const { data: templates, refetch } = useTemplate_GetListByCategoryIdQuery({
		categoryId: Number(CategoryId),
		skip: 0,
		take: 10000,
		where: {
			id: {
				eq: Number(TemplateId),
			},
		},
	});
	const templatesData = templates?.template_getListByCategoryId?.result;

	// edit template
	const { mutate: editTemplate } = useTemplate_EditMutation();

	// -------------------------------states
	const [Content, setContent] = useState<string>(templatesData?.items[0]?.content as string);

	useEffect(() => {
		if (templates) {
			setContent(templatesData?.items[0]?.content as string);
		}
	}, [templates]);

	// -------------------------------form
	const defaultValues: DefaultValueProps = {
		title: (templatesData?.items[0]?.title as string) || '',
	};

	const methods = useForm({
		resolver: yupResolver(templateSchema),
		values: defaultValues,
	});

	const { handleSubmit, getValues, reset } = methods;

	const onSubmit = (values: any) => {
		editTemplate(
			{
				templateId: Number(TemplateId),
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
						refetch();
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

						<Stack>
							<Stack width={'50%'}>
								<Label>Title</Label>

								<TextField name="title" fullWidth />
							</Stack>

							<Label>Write A Message</Label>

							{Content && (
								<SlateEditor
									editorOutput={
										Content !== (templatesData?.items[0]?.content as string)
											? Content
											: (templatesData?.items[0]?.content as string)
									}
									setEditorOutput={setContent}
								/>
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

export default EditTemplate;

// -------------------------------template schema
const templateSchema = Yup.object().shape({
	title: Yup.string().required('Enter Your Title').trim(),
});
