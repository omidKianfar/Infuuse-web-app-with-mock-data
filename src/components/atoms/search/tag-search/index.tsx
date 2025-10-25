import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { useContact_GetListByBusinessIdQuery, useTagCategory_GetListByBusinessIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';

interface props {
	choosenTagId: number | null;
	setChoosenTagId: React.Dispatch<React.SetStateAction<number | null>>;
	choosenTagtName: string | null;
	setChoosenTagName: React.Dispatch<React.SetStateAction<string | null>>;
}

const TagSearch = ({ choosenTagId, setChoosenTagId, choosenTagtName, setChoosenTagName }: props) => {
	const theme = useTheme();
	const router = useRouter();

	const BusinessId = router?.query?.businessId;

	const [searchData, setSearchData] = useState<string>('');
	const [SearchMenu, setSearchMenu] = useState<boolean>(false);

	React.useEffect(() => {
		if (searchData) {
			setSearchMenu(true);
		} else {
			setSearchMenu(false);
		}
	}, [searchData]);


	const { data: Tags } = useTagCategory_GetListByBusinessIdQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 1000,
		where: {
			name: {
				contains: searchData,
			},
		},
	});

	const TagsData = Tags?.tagCategory_getListByBusinessId?.result;

	const contactChoosenHandler = () => {
		setChoosenTagId(null);
		setChoosenTagName(null);
		setSearchData('');
		setSearchMenu(false);
	};

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'} mb={2}>
				{/* -------------------------------search field */}
				{choosenTagId === null ? (
					<CustomTextField
						fullWidth
						placeholder="Tag"
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
						value={choosenTagtName}
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
						TagsData={TagsData}
						setChoosenTagId={setChoosenTagId}
						setChoosenTagName={setChoosenTagName}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default TagSearch;

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
