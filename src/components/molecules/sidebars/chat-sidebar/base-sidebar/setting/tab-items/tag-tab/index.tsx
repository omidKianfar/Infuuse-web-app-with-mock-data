import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import CloseIconBox from '@/assets/close-icon-box';
import PinIcon from '@/assets/pin-icon';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {
	ContactTagCategory,
	SortEnumType,
	useContactTagCategory_DeleteMutation,
	useContactTagCategory_EditMutation,
	useContactTagCategory_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';

interface Props {
	scrollToTab: () => void;
}
const TagTab = ({ scrollToTab }: Props) => {
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId;

	const { data: contactTagList } = useContactTagCategory_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 10000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const contactTagListData = contactTagList?.contactTagCategory_getListByContactId?.result;
	console.log('contactTagListData',contactTagListData);
	

	const { mutate: deleteContactTag } = useContactTagCategory_DeleteMutation();
	const { mutate: editContactTag, isLoading: pinTagLoading } = useContactTagCategory_EditMutation();

	const deleteContactTagHandler = (contactTagCategoryId: number) => {
		deleteContactTag(
			{
				contactTagCategoryId: Number(contactTagCategoryId),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						queryClient.refetchQueries(['contactTagCategory_getListByContactId']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	const editContactTagHandler = (contactTagCategory: ContactTagCategory) => {
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
		<Stack width={'100%'} height={'100%'}>
			{contactTagListData?.items?.map((contactTagCategory) => (
				<Stack
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
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Box
							mr={1}
							display={'flex'}
							justifyContent={'start'}
							alignItems={'center'}
							sx={{ cursor: 'pointer' }}
							onClick={() => deleteContactTagHandler(contactTagCategory?.id as number)}
						>
							<CloseIconBox />
						</Box>

						<Typography color={theme?.palette?.infuuse.blue500} fontWeight={'bold'}>
							{stringSlicer(contactTagCategory?.tagCategory?.name, 20)}
						</Typography>
					</Stack>

					<Box
						display={'flex'}
						justifyContent={'start'}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
						onClick={() => editContactTagHandler(contactTagCategory as ContactTagCategory)}
					>
						{pinTagLoading ? <LoadingProgress size={16} color={theme?.palette?.infuuse?.blue100} /> : <PinIcon width="24px" height="24px" fill={contactTagCategory?.isPinned ? theme?.palette?.infuuse?.blue100 : theme?.palette?.infuuse?.gray500} />}
					</Box>
				</Stack>
			))}

			{contactTagListData?.items?.length >= 5 && (
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
		</Stack>
	);
};

export default TagTab;
