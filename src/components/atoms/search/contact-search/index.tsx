import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { useContact_GetListByBusinessIdQuery } from '@/graphql/generated';

interface props {
	BusinessId: number;
	choosenContactId: number | null;
	setChoosenContactId: React.Dispatch<React.SetStateAction<number | null>>;
	choosenContactName: string | null;
	setChoosenContactName: React.Dispatch<React.SetStateAction<string | null>>;
}

const ContactSearch = ({
	BusinessId,
	choosenContactId,
	setChoosenContactId,
	choosenContactName,
	setChoosenContactName,
}: props) => {
	const theme = useTheme();

	const [searchData, setSearchData] = useState<string>('');
	const [SearchMenu, setSearchMenu] = useState<boolean>(false);

	React.useEffect(() => {
		if (searchData) {
			setSearchMenu(true);
		} else {
			setSearchMenu(false);
		}
	}, [searchData]);


	const { data: Contacs } = useContact_GetListByBusinessIdQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 1000,
		where: {
			fullName: {
				contains: searchData,
			},
		},
	});

	const ContactsData = Contacs?.contact_getListByBusinessId?.result;

	const contactChoosenHandler = () => {
		setChoosenContactId(null);
		setChoosenContactName(null);
		setSearchData('');
		setSearchMenu(false);
	};

	return (
		<Stack>
			<Stack position={'relative'} mb={2}>
				{choosenContactId === null ? (
					<CustomTextField
						fullWidth
						placeholder="Contact"
						value={searchData}
						onChange={(e) => setSearchData(e.target.value)}
						onFocus={searchData ? () => setSearchMenu(true) : null}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton edge="end" onClick={() => setSearchData('')} sx={{ cursor: 'pointer' }}>
										{searchData && (
											<CloseIcon
												sx={{
													'&:hover': {
														color: theme?.palette?.infuuse?.red300,
													},
												}}
											/>
										)}{' '}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				) : (
					<CustomTextField
						value={choosenContactName}
						disabled
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={() => contactChoosenHandler()}
										sx={{ cursor: 'pointer' }}
									>
										<CloseIcon
											sx={{
												'&:hover': {
													color: theme?.palette?.infuuse?.red300,
												},
											}}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				)}
				{/* -------------------------------search menu */}
				{SearchMenu ? (
					<SearchMenuBody
						setSearchMenu={setSearchMenu}
						ContactsData={ContactsData}
						setChoosenContactId={setChoosenContactId}
						setChoosenContactName={setChoosenContactName}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ContactSearch;

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

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
