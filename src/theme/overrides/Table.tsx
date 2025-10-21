import { Components, Theme } from '@mui/material';

export default function Table(theme: ThemeOverrideType): Components<Omit<Theme, 'components'>> {
	return {
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: theme.palette.action.selected,
						'&:hover': {
							backgroundColor: theme.palette.action.hover,
						},
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					border: 'none',
				},
				head: {
					color: theme.palette.text.secondary,
					'&:first-of-type': {
						boxShadow: 'none',
						paddingLeft: theme.spacing(3),
						borderTopLeftRadius: theme.shape.borderRadius,
						borderBottomLeftRadius: theme.shape.borderRadius,
					},
					'&:last-of-type': {
						boxShadow: 'none',
						paddingRight: theme.spacing(3),
						borderTopRightRadius: theme.shape.borderRadius,
						borderBottomRightRadius: theme.shape.borderRadius,
					},
				},
				stickyHeader: {
					backgroundColor: '#36353A',
				},
				body: {
					'&:first-of-type': {
						paddingLeft: theme.spacing(3),
					},
					'&:last-of-type': {
						paddingRight: theme.spacing(3),
					},
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					borderTop: `solid 1px ${theme.palette.divider}`,
				},
				toolbar: {
					height: 64,
					paddingTop: '16px',
					'.MuiInputBase-root': {
						'.MuiSvgIcon-root': {
							color: 'rgb(255 255 255 / 26%)',
						},
					},
				},
				select: {
					'&:focus': {
						borderRadius: theme.shape.borderRadius,
					},
					'.MuiSvgIcon-root': {
						color: 'rgb(255 255 255 / 26%)',
					},
				},
				selectIcon: {
					width: 20,
					height: 20,
				},
				actions: {
					'.MuiButtonBase-root': {
						'&.Mui-disabled': {
							color: 'rgb(255 255 255 / 26%)',
						},
					},
				},
			},
		},
	};
}
