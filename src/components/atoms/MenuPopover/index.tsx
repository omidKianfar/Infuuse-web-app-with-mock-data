import React from 'react';
import { Popover, alpha } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';

type ArrowType =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'right-top'
	| 'right-center'
	| 'right-bottom';

type Props = React.PropsWithChildren &
	React.ComponentProps<typeof Popover> & {
		sx?: SxProps;
		arrow?: ArrowType;
		disabledArrow?: boolean;
	};

const ArrowStyle = styled('span')<{ arrow?: ArrowType }>(({ arrow, theme }) => {
	const SIZE = 12;

	const POSITION = -(SIZE / 2);

	const borderStyle = `solid 0.3px ${theme.palette.grey[300]}`;

	const topStyle = {
		borderRadius: '0 0 3px 0',
		top: POSITION,
		borderBottom: borderStyle,
		borderRight: borderStyle,
	};
	const bottomStyle = {
		borderRadius: '3px 0 0 0',
		bottom: POSITION,
		borderTop: borderStyle,
		borderLeft: borderStyle,
	};
	const leftStyle = {
		borderRadius: '0 3px 0 0',
		left: POSITION,
		borderTop: borderStyle,
		borderRight: borderStyle,
	};
	const rightStyle = {
		borderRadius: '0 0 0 3px',
		right: POSITION,
		borderBottom: borderStyle,
		borderLeft: borderStyle,
	};

	return {
		[theme.breakpoints.up('sm')]: {
			zIndex: 1,
			width: SIZE,
			height: SIZE,
			content: "''",
			position: 'absolute',
			transform: 'rotate(-135deg)',
			background: theme.palette.background.paper,
		},
		...(arrow === 'top-left' && { ...topStyle, left: 20 }),
		...(arrow === 'top-center' && { ...topStyle, left: 0, right: 0, margin: 'auto' }),
		...(arrow === 'top-right' && { ...topStyle, right: 20 }),
		...(arrow === 'bottom-left' && { ...bottomStyle, left: 20 }),
		...(arrow === 'bottom-center' && { ...bottomStyle, left: 0, right: 0, margin: 'auto' }),
		...(arrow === 'bottom-right' && { ...bottomStyle, right: 20 }),
		...(arrow === 'left-top' && { ...leftStyle, top: 20 }),
		...(arrow === 'left-center' && { ...leftStyle, top: 0, bottom: 0, margin: 'auto' }),
		...(arrow === 'left-bottom' && { ...leftStyle, bottom: 20 }),
		...(arrow === 'right-top' && { ...rightStyle, top: 20 }),
		...(arrow === 'right-center' && { ...rightStyle, top: 0, bottom: 0, margin: 'auto' }),
		...(arrow === 'right-bottom' && { ...rightStyle, bottom: 20 }),
	};
});

export default function MenuPopover({ children, arrow = 'top-right', disabledArrow, sx, ...other }: Props) {
	return (
		<Popover
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			PaperProps={{
				sx: {
					p: 1,
					width: 200,
					borderRadius: 1,
					boxShadow: 'none',
					overflow: 'inherit',
					bgcolor: (theme: any) => alpha(theme?.palette?.primary?.dark, 1),
					'& .MuiMenuItem-root': {
						typography: 'body1',
					},
					...sx,
				},
			}}
			{...other}
		>
			{!disabledArrow && <ArrowStyle arrow={arrow} />}

			{children}
		</Popover>
	);
}
