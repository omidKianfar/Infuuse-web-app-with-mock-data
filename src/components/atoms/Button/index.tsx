import { Box, Button, Menu, MenuProps, Stack, alpha, styled, useTheme } from '@mui/material';
import { MouseEventHandler, ReactNode, useState } from 'react';
import LoadingProgress from '../ProgressBar/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// -------------------------------button props
interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
	sx?: any;
	type?: string;
	disabled?: any;
	isLoading?: any;
	startIcon?: Element;
	endIcon?: Element;
	icon?: Element;
	text: string;
}

// -------------------------------blue button
export const NextButton = ({ onClick, children, sx, type, disabled, isLoading = false, startIcon, endIcon }: Props) => {
	return (
		<CustomNextButton onClick={onClick} type={type} sx={...sx} disabled={disabled} loading={isLoading}>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
				<Box display={'flex'} alignItems={'center'} mr={1}>
					{startIcon}
				</Box>
				{children}
				<Box display={'flex'} alignItems={'center'} ml={1}>
					{endIcon}
					{isLoading && <LoadingProgress size={20} />}
				</Box>
			</Stack>
		</CustomNextButton>
	);
};

// -------------------------------split button

export const SplitButton = ({ text, icon, children, sx, disabled }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<CustomNextButton
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				startIcon={icon}
				endIcon={<KeyboardArrowDownIcon />}
				disabled={disabled}
				sx={...sx}
			>
				{text && text}
			</CustomNextButton>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{children}
			</StyledMenu>
		</div>
	);
};

// ------------------------------- blue button style
const CustomNextButton = styled(Button)(({ theme }) => ({
	height: '48px',
	background: theme?.palette?.infuuse.blue500,
	color: theme?.palette?.common?.white,
	borderRadius: '16px',
	whiteSpace: 'nowrap',
	cursor: 'pointer',
	'&:hover': {
		background: theme?.palette?.infuuse.blueDark500,
		color: theme?.palette?.common?.white,

		svg: {
			path: {
				fill: theme?.palette?.common?.white,
			},
		},
	},
	'&:disabled': {
		backgroundColor: theme?.palette?.infuuse.gray500,
		color: theme?.palette?.common?.white,
		svg: {
			path: {
				fill: theme?.palette?.common?.white,
			},
		},
	},
}));

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme?.palette?.infuuse?.blueDark500,
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				color: theme?.palette?.common?.white,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(theme?.palette?.infuuse?.blue500, theme.palette.action.selectedOpacity),
			},
		},
		'&:disabled': {
			backgroundColor: theme?.palette?.infuuse?.gary500,
			color: theme?.palette?.common?.white,
			svg: {
				path: {
					fill: theme?.palette?.common?.white,
				},
			},
		},
	},
}));
