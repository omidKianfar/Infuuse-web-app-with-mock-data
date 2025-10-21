import UserIcon from '@/assets/user-icon';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Template, TemplateCollectionSegment } from '@/graphql/generated';
import { stringSlicer } from '../../string-slicer/string-slicer';

interface Props {
	setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
	TemplatesData: TemplateCollectionSegment;
	setChoosenTemplateContent: React.Dispatch<React.SetStateAction<string | null>>;
	setTemplateMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchMenuBody = ({ setSearchMenu, TemplatesData, setChoosenTemplateContent, setTemplateMenu }: Props) => {
	const theme = useTheme();

	const choosenConatctHandler = (template: Template) => {
		setChoosenTemplateContent(template?.content as string);
		setSearchMenu(false);
		setTemplateMenu(false);
	};

	return (
		<Stack
			width={'100%'}
			border={`1px solid ${theme.palette?.infuuse?.gray500}`}
			borderRadius={'16px'}
			p={2}
			position={'absolute'}
			zIndex={100}
			bottom={'56px'}
			left={0}
			bgcolor={theme?.palette?.common?.white}
			maxHeight={'400px'}
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
			{TemplatesData?.items?.map((template) => (
				<Stack key={template?.id} onClick={() => choosenConatctHandler(template as Template)}>
					<SearchItem direction={'row'}>
						<Typography>{stringSlicer(template?.title, 40)}</Typography>
					</SearchItem>
				</Stack>
			))}
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
