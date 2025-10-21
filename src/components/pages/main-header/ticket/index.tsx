import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useSnapshot } from 'valtio';
import ticketStore from '@/store/ticket.store';
import TicketSidebar from './sidebar';

const TicketColumns = dynamic(() => import('./columns'), { ssr: false });

const Ticket = () => {
	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------state managment
	const { ticketSidebar } = useSnapshot(ticketStore);

	// ------------------------------- state
	const [businessId, setBusinessId] = useState<number>(Number(CurrentUser?.businessAccesses[0]?.business?.id));

	useEffect(() => {
		if (businessId === undefined) {
			setBusinessId(Number(CurrentUser?.businessAccesses[0]?.business?.id));
		}
	}, [businessId]);
	
	return (
		<Stack width={'100%'} height={'100%'} p={2}>
			<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
				<Stack width={'100%'} height={'100%'}>
					<TicketColumns businessId={businessId} setBusinessId={setBusinessId} />
				</Stack>
				<Stack>{ticketSidebar ? <TicketSidebar businessId={businessId}/> : null}</Stack>
			</Stack>
		</Stack>
	);
};

export default Ticket;
