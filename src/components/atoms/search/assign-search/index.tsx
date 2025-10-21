import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { useBusiness_GetTeamByBusinessIdQuery } from '@/graphql/generated';
import SearchMenuBody from './menu';

interface props {
	BusinessId?: number;
	choosenAssignUserId: number | null;
	setChoosenAssignUserId: React.Dispatch<React.SetStateAction<number | null>>;
	choosenAssignUserName: string | null;
	setChoosenAssignUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const AssignSearch = ({
	BusinessId,
	choosenAssignUserId,
	setChoosenAssignUserId,
	choosenAssignUserName,
	setChoosenAssignUserName,
}: props) => {

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
	const { data: TeamMembers } = useBusiness_GetTeamByBusinessIdQuery({
		businessId: Number(BusinessId),
		permissionType: null,
		skip: 0,
		take: 10000,
		where: {
			fullName: {
				contains: searchData,
			},
		},
	});
	const TeamMembersData = TeamMembers?.business_getTeamByBusinessId?.result;

	const assignChoosenHandler = () => {
		setChoosenAssignUserId(null);
		setChoosenAssignUserName(null);
		setSearchData('');
		setSearchMenu(false);
	};

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'} mb={2}>
				{/* -------------------------------search field */}
				{choosenAssignUserId === null ? (
					<CustomTextField
						fullWidth
						placeholder="Assign Team Member"
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
						value={choosenAssignUserName}
						disabled
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton edge="end" onClick={assignChoosenHandler} sx={{ cursor: 'pointer' }}>
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
						TeamMembersData={TeamMembersData}
						setChoosenAssignUserId={setChoosenAssignUserId}
						setChoosenAssignUserName={setChoosenAssignUserName}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default AssignSearch;

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
