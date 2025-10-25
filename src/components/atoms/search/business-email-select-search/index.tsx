import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { BusinessTypeMember, SortEnumType, useBusiness_GetListQuery } from '@/graphql/generated';

interface props {
	choosenBusinessId: number | null;
	setChoosenBusinessId: React.Dispatch<React.SetStateAction<number | null>>;
	choosenBusinessEmail: string | null;
	setChoosenBusinessEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const BusinessEmailSearch = ({
	choosenBusinessId,
	setChoosenBusinessId,
	choosenBusinessEmail,
	setChoosenBusinessEmail,
}: props) => {
	const theme = useTheme();

	const [searchData, setSearchData] = useState<string>('');
	const [SearchMenu, setSearchMenu] = useState<boolean>(false);

	const { data: Businesses } = useBusiness_GetListQuery({
		skip: 0,
		take: 10000,
		...(Boolean(searchData === '') && {
			where: {
				and: [
					{
						businessMembers: {
							some: {
								typeMember: {
									eq: BusinessTypeMember?.Owner,
								},
							},
						},
					},
					{
						isHideAgency: {
							eq: false
						}
					},
				],
			},
		}),
		...(Boolean(searchData !== '') && {
			where: {
				and: [
					{
						businessMembers: {
							some: {
								and: [{
									typeMember: {
										eq: BusinessTypeMember?.Owner,
									},
								}, {
									email: {
										contains: searchData
									}
								}]
							},
						},
					},
					{
						isHideAgency: {
							eq: false
						}
					},

				],
			},
		}),

		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const BusinessesData = Businesses?.business_getList?.result;

	const contactChoosenHandler = () => {
		setChoosenBusinessId(null);
		setChoosenBusinessEmail(null);
		setSearchData('');
		setSearchMenu(false);
	};

	const Endhandeler = () => {
		setSearchData('')
		setSearchMenu(false)
	}

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'} >
				{/* -------------------------------search field */}
				{choosenBusinessId === null ? (
					<CustomTextField
						fullWidth
						placeholder="Business"
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
						value={choosenBusinessEmail}
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
						BusinessesData={BusinessesData}
						setChoosenBusinessId={setChoosenBusinessId}
						setChoosenBusinessEmail={setChoosenBusinessEmail}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default BusinessEmailSearch;

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
