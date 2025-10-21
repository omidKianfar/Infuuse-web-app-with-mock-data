import TagIcon from '@/assets/tag-icon';
import { Box, MenuItem, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import TagItem from './tag-item';
import { SortEnumType, TypeSocialNetwork, useContactTagCategory_GetListByContactIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';
import chatFilterMessage from '@/store/chat-filter-message';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';

const Header = () => {
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId;

	// --------------------------------query
	const { data: contactTagList } = useContactTagCategory_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 10000,
		where: {
			isPinned: {
				eq: true,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const contactTagListData = contactTagList?.contactTagCategory_getListByContactId?.result;

	// --------------------------------filter
	const { chatSidebar } = useSnapshot(chatStore);
	const [filterItem, setFilterItem] = useState('All Message');

	const { filter } = useSnapshot(chatFilterMessage);

	const filterHandler = (value) => {
		setFilterItem(value);
		chatFilterMessage.filter = value;
	};

	return (
		<Stack height={'50px'} padding="16px " direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
			{/* ------------------------tag */}
			<Box display={'flex'} justifyContent={'center'} alignItems={'center'} px={1}>
				<TagIcon />
			</Box>

			<Stack
				direction={'row'}
				justifyContent={'start'}
				alignItems={'center'}
				width={'100%'}
				maxWidth={chatSidebar ? '400px' : '100%'}
				height={'50px'}
				sx={{ overflowX: 'auto' }}
			>
				{contactTagListData?.items?.map((contactTagCategory) => (
					<Stack key={contactTagCategory?.id}>
						<TagItem contactTagCategory={contactTagCategory} />
					</Stack>
				))}
			</Stack>

			{/* ------------------------filter */}
			{router?.pathname?.includes('inbox') && (
				<Stack width={'200px'}>
					<CustomTextField select fullWidth value={filterItem}>
						{FilterData?.map((item) => (
							<MenuItem key={item?.value} value={item?.value} onClick={() => filterHandler(item?.value)}>
								<Typography color={theme?.palette?.infuuse?.blue200} fontWeight={'bold'}>
									{item?.name}
								</Typography>
							</MenuItem>
						))}
					</CustomTextField>
				</Stack>
			)}
		</Stack>
	);
};

export default Header;

const FilterData = [
	{ name: 'All Message', value: 'All Message' },
	{ name: 'Email', value: TypeSocialNetwork?.Email },
	{ name: 'Facebook', value: TypeSocialNetwork?.Facebook },
	{ name: 'Instagram', value: TypeSocialNetwork?.Instagram },
	{ name: 'LiveChat', value: TypeSocialNetwork?.LiveChat },
	{ name: 'PhoneNumber', value: TypeSocialNetwork?.PhoneNumber },
	{ name: 'Sms', value: TypeSocialNetwork?.Sms },
	{ name: 'TwilioVideoCall', value: TypeSocialNetwork?.TwilioVideoCall },
	{ name: 'TwilioVoiceCall', value: TypeSocialNetwork?.TwilioVoiceCall },
	{ name: 'WhatsApp', value: TypeSocialNetwork?.WhatsApp },
];

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray200,
		borderRadius: '16px',
		height: '35px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '35px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
			height: '35px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray200,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));
