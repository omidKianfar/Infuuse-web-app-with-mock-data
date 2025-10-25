import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';

interface props {
	choosenTimeZone: string | null;
	setChoosenTimeZone: React.Dispatch<React.SetStateAction<string | null>>;
}

const TimeZoneSearch = ({
	choosenTimeZone,
	setChoosenTimeZone,
}: props) => {
	const theme = useTheme();

	const [searchData, setSearchData] = useState<string>('');
	const [SearchMenu, setSearchMenu] = useState<boolean>(false);

	const contactChoosenHandler = () => {
		setChoosenTimeZone(null);
		setSearchData('');
		setSearchMenu(false);
	};

	const Endhandeler = () => {
		setSearchData('')
		setSearchMenu(false)
	}

	return (
		<Stack>
			<Stack position={'relative'} mb={2}>
				{choosenTimeZone === null ? (
					<CustomTextField
						fullWidth
						placeholder="Time Zone"
						value={searchData}
						onChange={(e) => setSearchData(e.target.value)}
						onFocus={() => setSearchMenu(true)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton edge="end" onClick={Endhandeler} sx={{ cursor: 'pointer' }}>
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
						value={choosenTimeZone}
						disabled
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={contactChoosenHandler}
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
						searchData={searchData}
						setChoosenTimeZone={setChoosenTimeZone}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default TimeZoneSearch;

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
