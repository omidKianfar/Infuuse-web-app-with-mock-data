import { NextButton } from '@/components/atoms/Button';
import FilterList, { CustomTextField } from '@/components/atoms/select-filter/business-filter-list';
import { useBusinessMember_GetListQuery, useContact_GetListByBusinessIdQuery, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import settingStore from '@/store/setting.store';
import ticketStore from '@/store/ticket.store';
import { MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSnapshot } from 'valtio';

interface Props {
	businessId?: number;
	setBusinessId?: React.Dispatch<React.SetStateAction<number>>;
	contactTicket?: number | string;
	setContactTicket?: React.Dispatch<React.SetStateAction<number | string>>;
	assignTicket?: number | string;
	setAssignTicket?: React.Dispatch<React.SetStateAction<number | string>>;
	creatorTicket?: number | string;
	setCreatorTicket?: React.Dispatch<React.SetStateAction<number | string>>;
}

const Header = ({
	businessId,
	setBusinessId,
	contactTicket,
	setContactTicket,
	assignTicket,
	setAssignTicket,
	creatorTicket,
	setCreatorTicket,
}: Props) => {
	// -------------------------------state managment
	const { ticketSidebar } = useSnapshot(ticketStore);
	const { setting } = useSnapshot(settingStore);

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// creator
	const { data: MemberTicketCrator } = useBusinessMember_GetListQuery({
		skip: 0,
		take: 10000,
		where: {
			creatorTickets: {
				some: {
					businessId: {
						eq: Number(businessId),
					},
				},
			},
		},
	});
	const MemberTicketCratorList = MemberTicketCrator?.businessMember_getList?.result;

	// assigned
	const { data: MemberTicketassigned } = useBusinessMember_GetListQuery({
		skip: 0,
		take: 10000,
		where: {
			assignTickets: {
				some: {
					businessId: {
						eq: Number(businessId),
					},
				},
			},
		},
	});

	const MemberTicketAssignedList = MemberTicketassigned?.businessMember_getList?.result;

	// get contact
	const { data: contacts } = useContact_GetListByBusinessIdQuery({
		businessId: Number(businessId),
		skip: 0,
		take: 10000,
		where: {
			tickets: {
				some: {
					businessId: {
						eq: Number(businessId),
					},
				},
			},
		},
	});
	const ContactsData = contacts?.contact_getListByBusinessId?.result;

	const addTicketHandler = () => {
		ticketStore.ticketSidebar = true;
		ticketStore.ticketId = null;
	};

	return (
		<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} py={2}>
			<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} width={'100%'} spacing={1}>
				{CurrentUser?.user?.userType === UserType?.AgencyMember && (
					<Stack width={'250px'}>
						<FilterList businessId={businessId} setBusinessId={setBusinessId} />
					</Stack>
				)}

				{ticketStore.ticketSidebar === false && settingStore?.setting === false && (
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1}>
						<CustomTextField select label="Creator" value={creatorTicket} sx={{ width: '250px' }}>
							<MenuItem value="All" onClick={() => setCreatorTicket('All')}>
								<Typography>All</Typography>
							</MenuItem>
							{MemberTicketCratorList?.items?.map((creator) => (
								<MenuItem
									key={creator?.id}
									value={creator?.id}
									onClick={() => setCreatorTicket(creator?.id as number)}
								>
									<Typography>{creator?.fullName}</Typography>
								</MenuItem>
							))}
						</CustomTextField>

						<CustomTextField select label="Assigned to" value={assignTicket} sx={{ width: '250px' }}>
							<MenuItem value="All" onClick={() => setAssignTicket('All')}>
								<Typography>All</Typography>
							</MenuItem>
							{MemberTicketAssignedList?.items?.map((assignUser) => (
								<MenuItem
									key={assignUser?.id}
									value={assignUser?.id}
									onClick={() => setAssignTicket(assignUser?.id as number)}
								>
									<Typography>{assignUser?.fullName}</Typography>
								</MenuItem>
							))}
						</CustomTextField>

						<CustomTextField select label="Contact" value={contactTicket} sx={{ width: '250px' }}>
							<MenuItem value="All" onClick={() => setContactTicket('All')}>
								<Typography>All</Typography>
							</MenuItem>
							{ContactsData?.items?.map((contact) => (
								<MenuItem
									key={contact?.id}
									value={contact?.id}
									onClick={() => setContactTicket(contact?.id as number)}
								>
									<Typography>{contact?.fullName}</Typography>
								</MenuItem>
							))}
						</CustomTextField>
					</Stack>
				)}
			</Stack>

			<NextButton sx={{ width: '200px' }} onClick={addTicketHandler}>
				Add Ticket
			</NextButton>
		</Stack>
	);
};

export default Header;
