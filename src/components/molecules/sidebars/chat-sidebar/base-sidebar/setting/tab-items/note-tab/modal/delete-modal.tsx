import { NextButton } from '@/components/atoms/Button';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import {
	AgencyMemberAssignment,
	useBusinessConnectionRequest_CanceledMutation,
	useNote_DeleteMutation,
	useNote_GetListByContactIdQuery,
	UserType,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import React from 'react';

interface Props {
	handleClose: () => void;
	noteId: null | number;
}

const DeleteModal = ({ noteId, handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;

	// -------------------------------query
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

	// delete note
	const { mutate: deleteNote } = useNote_DeleteMutation();

	// cancel
	const DeleteHhandler = () => {
		deleteNote(
			{
				noteId: Number(noteId),
			},

			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose();
						queryClient.refetchQueries(['note_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={'24px'} borderRadius={2}>
			<Stack sx={{ textAlign: 'center', mb: 4 }}>
				<Typography fontWeight={'bold'} sx={{ textJustify: 'inter-word' }}>
					Do you want{' '}
					<span
						style={{
							color: theme?.palette?.infuuse?.red300,
							marginLeft: '4px',
						}}
					>
						delete
					</span>
					<span style={{ color: theme?.palette?.infuuse?.blue100, wordBreak: 'keep-all', margin: '0 4px' }}>
						{stringSlicer(NotesData?.items[0]?.content, 10)}
					</span>
					?
				</Typography>
			</Stack>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<NextButton onClick={handleClose} sx={{ width: '150px' }}>
					Cancel
				</NextButton>
				<NextButton
					onClick={DeleteHhandler}
					sx={{ width: '150px', backgroundColor: theme?.palette?.infuuse?.red300 }}
				>
					Delete
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default DeleteModal;
