import { NextButton } from '@/components/atoms/Button';
import { Template, useTemplate_DeleteMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

interface Props {
	handleClose: () => void;
	template: Template;
}

const DeleteModal = ({ template, handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------query
	// delete template
	const { mutate: templateDelete } = useTemplate_DeleteMutation();

	const DeleteHandler = () => {
		templateDelete(
			{
				templateId: Number(template?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						handleClose();
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['template_getList']);
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
						{template?.title}
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
