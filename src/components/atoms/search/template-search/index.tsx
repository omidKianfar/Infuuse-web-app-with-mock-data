import { IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchMenuBody from './menu';
import SearchIcon from '@/assets/search-icon';
import CloseIcon from '@mui/icons-material/Close';
import { useTemplate_GetListByBusinessIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';

interface props {
	setChoosenTemplateContent: React.Dispatch<React.SetStateAction<string | null>>
	setTemplateMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplatesSearch = ({ setChoosenTemplateContent, setTemplateMenu }: props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const BusinessId = router?.query?.businessId;

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

	const { data: Templates } = useTemplate_GetListByBusinessIdQuery({
		businessId: Number(BusinessId),
		skip: 0,
		take: 1000,
		where: {
			title: {
				contains: searchData,
			},
		},
	});

	const TemplatesData = Templates?.template_getListByBusinessId?.result;

	return (
		<Stack>
			{/* -------------------------------saerch */}
			<Stack position={'relative'}>
				{/* -------------------------------search field */}
				<CustomTextField
					fullWidth
					placeholder="Template"
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
				{/* -------------------------------search menu */}
				{SearchMenu ? (
					<SearchMenuBody
						setSearchMenu={setSearchMenu}
						TemplatesData={TemplatesData}
						setChoosenTemplateContent={setChoosenTemplateContent}
						setTemplateMenu={setTemplateMenu}
					/>
				) : null}
			</Stack>
		</Stack>
	);
};

export default TemplatesSearch;

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
