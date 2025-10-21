import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { SortEnumType, useNote_GetListByContactIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';
import CloseIconBox from '@/assets/close-icon-box';
import ModalContainer from '@/components/atoms/Modal';
import EditNote from './modal/edit-note';
import DeleteModal from './modal/delete-modal';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

interface Props {
	scrollToTab: () => void;
}

const NoteTab = ({ scrollToTab }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const contactId = router?.query?.contactId;

	const [noteId, setNoteId] = useState<null | number>(null);

	// ------------------------------- query
	const { data: Notes } = useNote_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 1000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const NotesData = Notes?.note_getListByContactId?.result;

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);
	const [counter, setCounter] = React.useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (NoteId: number, id: number) => {
		setCounter(id);
		setNoteId(Number(NoteId));
		handleOpen();
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			{NotesData?.items?.map((note) => (
				<Stack
					key={note?.id}
					mb={1}
					width={'100%'}
					border={`2px solid ${theme?.palette?.infuuse?.gray400}`}
					bgcolor={theme?.palette?.common?.white}
					borderRadius={2}
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					p={1}
				>
					<Stack onClick={() => handelModal(note?.id as number, 1)} sx={{ cursor: 'pointer' }} width={'100%'}>
						<Typography color={theme?.palette?.infuuse.blue500} fontWeight={'bold'}>
							{stringSlicer(note?.content, 30)}
						</Typography>
					</Stack>

					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => handelModal(note?.id as number, 2)}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<CloseIconBox />
					</Box>
				</Stack>
			))}

			{NotesData?.items?.length >= 5 && (
				<Box
					sx={{ cursor: 'pointer' }}
					onClick={scrollToTab}
					position={'fixed'}
					right={'8px'}
					bottom={'8px'}
					bgcolor={theme?.palette?.infuuse?.blue100}
					borderRadius={2}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					p={'2px'}
				>
					<KeyboardDoubleArrowUpIcon />
				</Box>
			)}

			<ModalContainer open={open} handleClose={handleClose}>
				{counter === 1 ? (
					<EditNote handleClose={handleClose} noteId={noteId} />
				) : counter === 2 ? (
					<DeleteModal handleClose={handleClose} noteId={noteId} />
				) : null}
			</ModalContainer>
		</Stack>
	);
};

export default NoteTab;
