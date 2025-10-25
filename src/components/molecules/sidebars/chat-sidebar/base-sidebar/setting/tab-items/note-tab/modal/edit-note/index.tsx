import CloseIconBox from '@/assets/close-icon-box';
import {
	Maybe,
	Note,
	useNote_EditMutation,
	useNote_GetListByContactIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { Label } from '@/components/pages/settings/members/styles';
import { NextButton } from '@/components/atoms/Button';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';

interface DefaultValuesType {
	note: string;
}

interface Props {
	handleClose: () => void;
	noteId: number | null;
}

const EditNote = ({ handleClose, noteId }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;


	const { data: Notes } = useNote_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1000,
		where: {
			id: {
				eq: Number(noteId),
			},
		},
	});

	const NotesData = Notes?.note_getListByContactId?.result;

	const { mutate: editNote } = useNote_EditMutation();

	const defaultValues: DefaultValuesType = {
		note: NotesData?.items[0]?.content || '',
	};

	const methods = useForm({
		resolver: yupResolver(noteSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		editNote(
			{
				noteId: Number(noteId),
				input: {
					content: values?.note,
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose();
						queryClient?.invalidateQueries(['note_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};
	return (
		<Stack
			width={'400px'}
			height={'320px'}
			bgcolor={theme?.palette?.infuuse?.gray200}
			border={`3px solid ${theme?.palette?.infuuse?.orange100}`}
			borderRadius={2}
			p={2}
		>
			<Stack position={'relative'} width={'100%'} height={'100%'}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '16px',
							color: theme?.palette?.infuuse?.blue500,
							textJustify: 'inter-word',
							wordBreak: 'keep-all',
						}}
					>
						Edit Note
					</Typography>

					<Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
						<CloseIconBox />
					</Box>
				</Stack>
				<Stack>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						<CustomDescription name="note" fullWidth rows={5} multiline placeholder="Write a note" />

						<Stack position={'absolute'} bottom={0} left={0} width={'100%'}>
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

export default EditNote;

const noteSchema = Yup.object().shape({
	note: Yup.string().required('Enter Your Note').min(2),
});

export const CustomDescription = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '150px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
	},
}));
