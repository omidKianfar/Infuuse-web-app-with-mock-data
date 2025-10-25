import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import { useSnapshot } from 'valtio';
import chatStore from '@/store/chat.store';
import { DealStatus, SortEnumType, useDeal_GetListByContactIdQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

interface Props {
	scrollToTab: () => void;
}
const DealTab = ({ scrollToTab }: Props) => {
	const theme = useTheme();
	const router = useRouter();
	const contactId = router?.query?.contactId;

	const { dealSidebar } = useSnapshot(chatStore);

	const { data: Deals } = useDeal_GetListByContactIdQuery({
		contactId: Number(contactId),
		skip: 0,
		take: 10000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const DealsData = Deals?.deal_getListByContactId?.result;

	const editDealHandelr = (dealId: number) => {
		chatStore.dealSidebar = true;
		chatStore.dealId = Number(dealId);
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			{DealsData?.items?.map((deal) => (
				<Stack
					key={deal?.id}
					mb={1}
					width={'100%'}
					border={`2px solid ${theme?.palette?.infuuse?.gray400}`}
					bgcolor={theme?.palette?.common?.white}
					borderRadius={2}
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					p={1}
					sx={{ cursor: 'pointer' }}
					onClick={() => editDealHandelr(deal?.id as number)}
				>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Typography color={theme?.palette?.infuuse.blue500} fontWeight={'bold'}>
							{stringSlicer(deal?.title, 8)}
						</Typography>
					</Stack>

					<Typography color={theme?.palette?.infuuse.green300} fontWeight={'bold'}>
						{deal?.price}$
					</Typography>

					<Typography color={theme?.palette?.infuuse.orange100} fontWeight={'bold'}>
						{stringSlicer(
							deal?.dealStatus === DealStatus?.AppointmentScheduled
								? 'Appointment Scheduled'
								: deal?.dealStatus === DealStatus?.ClosedWon
								? 'Closed Won'
								: 'Lead',
							7
						)}
					</Typography>
				</Stack>
			))}
			{DealsData?.items?.length >= 5 && (
				<Box
					sx={{ cursor: 'pointer' }}
					onClick={scrollToTab}
					position={'fixed'}
					right={'8px'}
					bottom={'8px'}
					bgcolor={theme?.palette?.infuuse?.blue100}
					borderRadius={2}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					p={'2px'}
				>
					<KeyboardDoubleArrowUpIcon />
				</Box>
			)}
		</Stack>
	);
};

export default DealTab;
