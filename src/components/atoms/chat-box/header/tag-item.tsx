import CloseIconBox from '@/assets/close-icon-box';
import PinIcon from '@/assets/pin-icon';
import { ContactTagCategory, useContactTagCategory_EditMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import React from 'react';
import LoadingProgress from '../../ProgressBar/CircularProgress';
import { useRouter } from 'next/router';

interface Props {
	contactTagCategory: ContactTagCategory;
}

const TagItem = ({ contactTagCategory }: Props) => {
	
	const theme = useTheme();
	const router = useRouter();


	const contactId = router?.query?.contactId

	const { mutate: editContactTag, isLoading: pinTagLoading } = useContactTagCategory_EditMutation();

	const editContactTagHandler = () => {
		editContactTag(
			{
				contactTagCategoryId: Number(contactTagCategory?.id),
				input: {
					isPinned: !contactTagCategory?.isPinned,
					tagCategoryId: Number(contactTagCategory?.tagCategoryId),
				},
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						queryClient.refetchQueries(['contactTagCategory_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} width={'100%'} height={'100%'} ml={2}>
			<Box
				display={'flex'}
				justifyContent={'start'}
				alignItems={'center'}
				border={`2px solid ${theme?.palette?.infuuse?.gray400}`}
				borderRadius={2}
				p={'4px'}
			>
				<Typography
					fontWeight={'bold'}
					color={theme?.palette?.infuuse?.blue500}
					sx={{ textWrap: 'nowrap', wordBreak: 'keep-all' }}
				>
					{contactTagCategory?.tagCategory?.name}
				</Typography>
				<Box
					display={'flex'}
					justifyContent={'start'}
					alignItems={'center'}
					sx={{ cursor: 'pointer' }}
					ml={1}
					onClick={editContactTagHandler}
				>
					{pinTagLoading ? <LoadingProgress size={16} color={theme?.palette?.infuuse?.blue100} /> : <PinIcon
						width="24px"
						height="24px"
						fill={contactTagCategory?.isPinned ? theme?.palette?.infuuse?.blue100 : theme?.palette?.infuuse?.gray500}
					/>}
				</Box>
			</Box>
		</Stack>
	);
};

export default TagItem;
