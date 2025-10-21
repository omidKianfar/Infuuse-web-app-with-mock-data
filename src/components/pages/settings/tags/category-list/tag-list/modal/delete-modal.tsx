import { NextButton } from '@/components/atoms/Button';
import { TagCategory, useTagCategory_DeleteMutation, useTemplate_DeleteMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

interface Props {
	handleClose: () => void;
	tag: TagCategory;
}

const DeleteModal = ({ tag, handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------query
	// delete tag
	const { mutate: tagDelete } = useTagCategory_DeleteMutation();

	const DeleteHandler = () => {
		tagDelete(
			{
				tagCategoryId: Number(tag?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['tagCategory_getList']);
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
						{tag?.name}
					</span>
					?
				</Typography>
			</Stack>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<NextButton onClick={handleClose} sx={{ width: '150px' }}>
					Cancel
				</NextButton>
				<NextButton
					onClick={DeleteHandler}
					sx={{ width: '150px', backgroundColor: theme?.palette?.infuuse?.red300 }}
				>
					Delete
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default DeleteModal;
