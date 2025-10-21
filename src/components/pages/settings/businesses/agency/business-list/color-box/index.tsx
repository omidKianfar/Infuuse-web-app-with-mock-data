import { ColorTagType, Maybe } from '@/graphql/generated';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
	color?: Maybe<ColorTagType> | undefined;
}

const ColorBox = ({ color }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	return (
		<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
			{/* ------------------------------- color */}
			<Box
				width={'12px'}
				height={'12px'}
				borderRadius={'360px'}
				bgcolor={
					color === ColorTagType?.Black
						? theme?.palette?.infuuseColorTag?.black
						: color === ColorTagType?.Blue
						? theme?.palette?.infuuseColorTag?.blue
						: color === ColorTagType?.Brown
						? theme?.palette?.infuuseColorTag?.brown
						: color === ColorTagType?.Gold
						? theme?.palette?.infuuseColorTag?.gold
						: color === ColorTagType?.Green
						? theme?.palette?.infuuseColorTag?.green
						: color === ColorTagType?.Orange
						? theme?.palette?.infuuseColorTag?.orange
						: color === ColorTagType?.Pink
						? theme?.palette?.infuuseColorTag?.pink
						: color === ColorTagType?.Purple
						? theme?.palette?.infuuseColorTag?.purple
						: color === ColorTagType?.Red
						? theme?.palette?.infuuseColorTag?.red
						: color === ColorTagType?.SeaGreen
						? theme?.palette?.infuuseColorTag?.seaGreen
						: color === ColorTagType?.Tan
						? theme?.palette?.infuuseColorTag?.tan
						: color === ColorTagType?.Turquoise
						? theme?.palette?.infuuseColorTag?.turquoise
						: color === ColorTagType?.Yellow
						? theme?.palette?.infuuseColorTag?.yellow
						: null
				}
			></Box>

			{/* ------------------------------- color name */}
			<Typography fontSize={'14px'} ml={1}>
				{color === ColorTagType?.Black
					? 'Black'
					: color === ColorTagType?.Blue
					? 'Blue'
					: color === ColorTagType?.Brown
					? 'Brown'
					: color === ColorTagType?.Gold
					? 'Gold'
					: color === ColorTagType?.Green
					? 'Green'
					: color === ColorTagType?.Orange
					? 'Orange'
					: color === ColorTagType?.Pink
					? 'Pink'
					: color === ColorTagType?.Purple
					? 'purple'
					: color === ColorTagType?.Red
					? 'Red'
					: color === ColorTagType?.SeaGreen
					? 'Sea Green'
					: color === ColorTagType?.Tan
					? 'Tan'
					: color === ColorTagType?.Turquoise
					? 'Turquoise'
					: color === ColorTagType?.Yellow
					? 'Yellow'
					: ''}
			</Typography>
		</Stack>
	);
};

export default ColorBox;
