import ArrowRightIcon from '@/assets/arrow-right-icon';
import AssignIcon from '@/assets/assign-icon';
import PhonebookIcon from '@/assets/phonebook-icon';
import TicketIcon from '@/assets/ticket-icon';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '../..';

const UserItems = () => {
	const theme = useTheme();

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	return (
		<Stack
			position={'relative'}
			border={`3px solid ${theme?.palette?.infuuse.gray200}`}
			height={'150px'}
			borderRadius={'16px'}
			p={1}
			bgcolor={theme?.palette?.infuuse.gray200}
			mb={1}
		>
			<ItemBox
				direction={'row'}
				onClick={() =>
					setSidebars({
						...sidebars,
						assign: true,
					})
				}
			>
				<Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
					<AssignIcon fill={theme?.palette?.infuuse?.green200} />
					<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} ml={2}>
						Assign
					</Typography>
				</Stack>
				<ArrowRightIcon />
			</ItemBox>

			{/* -------------------------------ticket */}
			<ItemBox
				direction={'row'}
				onClick={() =>
					setSidebars({
						...sidebars,
						ticket: true,
					})
				}
			>
				<Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
					<Box>
						<TicketIcon fill={theme?.palette?.infuuse?.blue300} />
					</Box>
					<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} ml={2}>
						Create Ticket
					</Typography>
				</Stack>
				<ArrowRightIcon />
			</ItemBox>

			{/* ------------------------------- exist contact */}
			<ItemBox
				direction={'row'}
				onClick={() =>
					setSidebars({
						...sidebars,
						existContact: true,
					})
				}
			>
				<Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
					<PhonebookIcon fill={theme?.palette?.infuuse?.blue500} />
					<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.blue500} ml={2}>
						Add To Existing Contact
					</Typography>
				</Stack>
				<ArrowRightIcon />
			</ItemBox>
		</Stack>
	);
};

export default UserItems;

export const ItemBox = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	justifyContent: 'space-between',
	mb: '8px',
	padding: '4px ',
	borderRadius: '8px',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
	},
}));
