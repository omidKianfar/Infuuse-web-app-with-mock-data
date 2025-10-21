import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';

interface props {
	choosenGroupUser: never[];
	setChoosenGroupUser: React.Dispatch<React.SetStateAction<never[]>>;
}

const AgencyGroupUserSearch = ({ choosenGroupUser, setChoosenGroupUser }: props) => {
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

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'} mb={2}>
				{/* -------------------------------search field */}

				<CustomTextField
					fullWidth
					placeholder="Members"
					onChange={(e) => setSearchData(e.target.value)}
					value={searchData}
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

				{/* -------------------------------search menu */}
				{SearchMenu ? (
					<SearchMenuBody
						setSearchMenu={setSearchMenu}
						setSearchData={setSearchData}
						choosenGroupUser={choosenGroupUser}
						setChoosenGroupUser={setChoosenGroupUser}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default AgencyGroupUserSearch;

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
