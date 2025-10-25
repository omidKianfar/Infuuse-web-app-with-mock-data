import CloseIcon from '@mui/icons-material/Close';
import UserIcon from '@/assets/user-icon';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';

interface Props {
	setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchMenuBody = ({ setSearchMenu }: Props) => {
	const theme = useTheme();

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

			<Stack>
				<SearchItem direction={'row'}>
					<Stack mr={2}>
						<UserIcon fill={theme.palette?.infuuse?.gray500} />
					</Stack>

					<Typography>omid</Typography>
				</SearchItem>
			</Stack>
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
