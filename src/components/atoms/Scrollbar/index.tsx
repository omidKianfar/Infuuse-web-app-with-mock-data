import { alpha, styled, SxProps } from '@mui/material/styles';
import React from 'react';
import SimpleBarReact from 'simplebar-react';

const Wrapper = styled('div')({
	flexGrow: 1,
	height: '100%',
	overflow: 'hidden',
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
	maxHeight: '100%',
	'& .simplebar-scrollbar': {
		'&:before': {
			backgroundColor: alpha(theme.palette.grey[600], 0.48),
		},
		'&.simplebar-visible:before': {
			opacity: 1,
		},
	},
	'& .simplebar-track.simplebar-vertical': {
		width: 10,
	},
	'& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
		height: 6,
	},
	'& .simplebar-mask': {
		zIndex: 'inherit',
	},
}));

type Props = React.PropsWithChildren &
	React.ComponentProps<typeof SimpleBarReact> & {
		sx?: SxProps;
	};

export default function Scrollbar({ children, sx, ...other }: Props) {
	return (
		<Wrapper>
			<SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
				{children}
			</SimpleBarStyle>
		</Wrapper>
	);
}
