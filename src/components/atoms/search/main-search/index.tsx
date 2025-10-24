import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { ContactCollectionSegment, useContact_GetListByBusinessIdQuery } from '@/graphql/generated';

interface props {
	handleClose: () => void;
	BusinessId: number;
	choosenContactId: number | null;
	setChoosenContactId: React.Dispatch<React.SetStateAction<number | null>>;
	choosenContactName: string | null;
	setChoosenContactName: React.Dispatch<React.SetStateAction<string | null>>;
}

const MainSearch = ({
	handleClose,
	BusinessId,
	choosenContactId,
	setChoosenContactId,
	choosenContactName,
	setChoosenContactName,
}: Partial<props>) => {
	// -------------------------------tools
	const theme = useTheme();

	const [searchData, setSearchData] = useState<string>('');
	const [SearchMenu, setSearchMenu] = useState<boolean>(false);

	// -------------------------------menu handler
	React.useEffect(() => {
		if (searchData) {
			setSearchMenu(true);
		} else {
			setSearchMenu(false);
		}
	}, [searchData]);

	// -------------------------------search query

	const { data: Contacts } = useContact_GetListByBusinessIdQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 1000,
		where: {
			fullName: {
				contains: searchData,
			},
		},
	});

	const ContactsData = Contacts?.contact_getListByBusinessId?.result;

	const contactChoosenHandler = () => {
		setChoosenContactId?.(null);
		setChoosenContactName?.(null);
		setSearchData('');
		setSearchMenu(false);
	};

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'} mb={2}>
				{/* -------------------------------search field */}
				{choosenContactId === null ? (
					<CustomTextField
						fullWidth
						placeholder="Contact"
						value={searchData}
						onChange={(e) => setSearchData(e.target.value)}
						onFocus={searchData ? () => setSearchMenu(true) : undefined}
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
						fullWidth
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
						handleClose={handleClose}
						setSearchMenu={setSearchMenu}
						ContactsData={ContactsData as ContactCollectionSegment}
						BusinessId={BusinessId}
						setChoosenContactId={setChoosenContactId}
						setChoosenContactName={setChoosenContactName}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default MainSearch;

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	// ["@media (max-width:600px)"]: {

	// },

	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',
		width: '100%',
		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
			// borderRadius: "16px",
		},
	},
}));
