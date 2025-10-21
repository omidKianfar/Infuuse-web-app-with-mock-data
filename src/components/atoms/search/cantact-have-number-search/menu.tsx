import CloseIconBox from '@/assets/close-icon-box';
import UserIcon from '@/assets/user-icon';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Contact, ContactCollectionSegment } from '@/graphql/generated';

interface Props {
	setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
	ContactsData?: ContactCollectionSegment;
	setChoosenContactId: React.Dispatch<React.SetStateAction<number | null>>;
	setChoosenContactName: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchMenuBody = ({ setSearchMenu, ContactsData, setChoosenContactId, setChoosenContactName }: Props) => {
	const theme = useTheme();

	const choosenConatctHandler = (contact: Contact) => {
		setChoosenContactId(contact?.id as number);
		setChoosenContactName(contact?.fullName as string);
		setSearchMenu(false);
	};

	return (
		<Stack
			width={'100%'}
			border={`1px solid ${theme.palette?.infuuse?.gray500}`}
			borderRadius={'16px'}
			p={'8px'}
			position={'absolute'}
			zIndex={100}
			top={'56px'}
			left={0}
			bgcolor={theme?.palette?.common?.white}
			maxHeight={'200px'}
			overflow={'auto'}
		>
			<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
				<Stack onClick={() => setSearchMenu(false)} sx={{ cursor: 'pointer' }}>
					<CloseIcon
						sx={{
							'&:hover': {
								color: theme?.palette?.infuuse?.red300,
							},
						}}
					/>
				</Stack>
			</Stack>

			{/* -------------------------------search items (query) */}
			{ContactsData?.items?.map((contact) => (
				<Stack key={contact?.id} onClick={() => choosenConatctHandler(contact)}>
					<SearchItem direction={'row'}>
						<Stack mr={2}>
							<UserIcon fill={theme.palette?.infuuse?.gray500} />
						</Stack>

						<Typography>{contact?.fullName}</Typography>
					</SearchItem>
				</Stack>
			))}
		</Stack>
	);
};

export default SearchMenuBody;

export const SearchItem = styled(Stack)(({ theme }) => ({
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
	marginBottom: '16px',
	cursor: 'pointer',
	'&:hover': {
		padding: '8px',
		borderRadius: '8px',
		backgroundColor: theme.palette.infuuse?.blue100,
	},
}));
