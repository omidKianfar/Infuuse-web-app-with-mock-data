import { NextButton } from '@/components/atoms/Button';
import { useContact_MergeContactMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '../..';

interface Props {
	handleClose: () => void;
	choosenContactId: number | null;
}

const AddExistContactModal = ({ handleClose, choosenContactId }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId;

	// -------------------------------context
	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	// -------------------------------query
	// add to exist contact mutation
	const { mutate: mergContact } = useContact_MergeContactMutation();

	const ActiveHandler = () => {
		mergContact(
			{
				fromContactId: Number(ContactId),
				toContactId: Number(choosenContactId),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						setSidebars({
							...sidebars,
							existContact: false,
						});
						location?.reload();
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
					Merged messages cannot be be unmerged
				</Typography>
			</Stack>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<NextButton
					onClick={handleClose}
					sx={{ width: '150px', backgroundColor: theme?.palette?.infuuse?.red300 }}
				>
					Cancel
				</NextButton>
				<NextButton onClick={ActiveHandler} sx={{ width: '150px' }}>
					Confirm
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default AddExistContactModal;
