import { Box, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { BaseSidebarContext } from '..';
import AddIcon from '@/assets/add-icon';
import ModalContainer from '@/components/atoms/Modal';
import AddTagModal from './modal';
import CloseIconBox from '@/assets/close-icon-box';
import TagSearch from '@/components/atoms/search/tag-search';
import { NextButton } from '@/components/atoms/Button';
import { useContactTagCategory_AddMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { useRouter } from 'next/router';

const TagSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId;

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	const [choosenTagId, setChoosenTagId] = useState<null | number>(null);
	const [choosenTagtName, setChoosenTagName] = useState<null | string>(null);

	const { mutate: addContactTag } = useContactTagCategory_AddMutation();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	const addContactTagHandler = () => {
		addContactTag(
			{
				contactId: Number(ContactId),
				input: {
					isPinned: false,
					tagCategoryId: Number(choosenTagId),
				},
			},

			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						setSidebars({
							...sidebars,
							tag: false,
						});
						queryClient.invalidateQueries(['contactTagCategory_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------header */}
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
				<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
					Tag
				</Typography>
				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() =>
							setSidebars({
								...sidebars,
								tag: false,
							})
						}
					>
						<CloseIconBox />
					</Box>
				</Stack>
			</Stack>

			{/* -------------------------------add tag */}
			<Stack width={'100%'} direction={'row'} justifyContent={'end'} alignItems={'center'} mb={2}>
				<Box onClick={handelModal} sx={{ cursor: 'pointer' }}>
					<AddIcon width="32px" height="32px" />
				</Box>
				{/* -------------------------------add tag modal*/}
				<ModalContainer open={open} handleClose={handleClose}>
					<AddTagModal handleClose={handleClose} />
				</ModalContainer>
			</Stack>

			{/* ------------------------------- search */}
			<TagSearch
				choosenTagId={choosenTagId}
				setChoosenTagId={setChoosenTagId}
				choosenTagtName={choosenTagtName}
				setChoosenTagName={setChoosenTagName}
			/>

			<Stack mt={4}>
				<NextButton onClick={addContactTagHandler}>Add</NextButton>
			</Stack>
		</Stack>
	);
};

export default TagSidebar;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

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
