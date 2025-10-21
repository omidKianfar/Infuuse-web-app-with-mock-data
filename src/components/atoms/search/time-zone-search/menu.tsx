import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';

interface Props {
	setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
	searchData?: string;
	setChoosenTimeZone: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchMenuBody = ({ setSearchMenu, searchData, setChoosenTimeZone }: Props) => {
	const theme = useTheme();


	const timeZoneOptions = moment.tz.names();

	const choosenZoneHandler = (zone: string) => {
		setChoosenTimeZone(zone as string);
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
			{searchData !== ''
				?
				<>

					{

						timeZoneOptions?.filter((item) => item?.toLowerCase()?.startsWith(searchData?.toLowerCase()))?.map((zone) => (
							<Stack key={zone} onClick={() => choosenZoneHandler(zone as string)}>
								<SearchItem direction={'row'}>
									<Typography>{zone}</Typography>
								</SearchItem>
							</Stack>
						))
					}
				</>
				:
				<>
					{
						timeZoneOptions?.map((zone) => (
							<Stack key={zone} onClick={() => choosenZoneHandler(zone as string)}>
								<SearchItem direction={'row'}>
									<Typography>{zone}</Typography>
								</SearchItem>
							</Stack>
						))
					}
				</>
			}
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
