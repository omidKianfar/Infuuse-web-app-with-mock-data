import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
	SortEnumType,
	TicketStatus,
	UserType,
	useTicket_EditMutation,
	useTicket_GetListByBusinessIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import TicketCart from './cart/ticket-cart';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import Header from './header';

interface Props {
	businessId?: number;
	setBusinessId: React.Dispatch<React.SetStateAction<number>>;
}

const TicketColumns = ({ businessId, setBusinessId }: Props) => {
	const theme = useTheme();
	const queryClient = useQueryClient();

	const [contactTicket, setContactTicket] = useState<string | number>('All');
	const [assignTicket, setAssignTicket] = useState<string | number>('All');
	const [creatorTicket, setCreatorTicket] = useState<string | number>('All');

	// -----------------------------------columns
	const [columns, setColumns] = useState([
		{
			id: '1',
			name: 'Unresolved',
		},
		{
			id: '2',
			name: 'Resolved',
		},
	]);

	// -----------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	//  tickets
	const { data: Tickets } = useTicket_GetListByBusinessIdQuery({
		businessId:
			CurrentUser?.user?.userType === UserType?.BusinessMember
				? Number(CurrentUser?.businessAccesses[0]?.business?.id)
				: businessId
				? Number(businessId)
				: Number(CurrentUser?.businessAccesses[0]?.business?.id),
		skip: 0,
		take: 10000,
		...(Boolean(creatorTicket !== 'All') && {
			where: {
				creatorId: {
					eq: Number(creatorTicket),
				},
			},
		}),
		...(Boolean(assignTicket !== 'All') && {
			where: {
				assignUserId: {
					eq: Number(assignTicket),
				},
			},
		}),
		...(Boolean(contactTicket !== 'All') && {
			where: {
				contactId: {
					eq: Number(contactTicket),
				},
			},
		}),
		...(Boolean(creatorTicket !== 'All' && assignTicket !== 'All') && {
			where: {
				and: [
					{
						creatorId: {
							eq: Number(creatorTicket),
						},
					},
					{
						assignUserId: {
							eq: Number(assignTicket),
						},
					},
				],
			},
		}),
		...(Boolean(creatorTicket !== 'All' && contactTicket !== 'All') && {
			where: {
				and: [
					{
						creatorId: {
							eq: Number(creatorTicket),
						},
					},
					{
						contactId: {
							eq: Number(contactTicket),
						},
					},
				],
			},
		}),
		...(Boolean(assignTicket !== 'All' && contactTicket !== 'All') && {
			where: {
				and: [
					{
						assignUserId: {
							eq: Number(assignTicket),
						},
					},
					{
						contactId: {
							eq: Number(contactTicket),
						},
					},
				],
			},
		}),
		...(Boolean(creatorTicket !== 'All' && assignTicket !== 'All' && contactTicket !== 'All') && {
			where: {
				and: [
					{
						creatorId: {
							eq: Number(creatorTicket),
						},
					},
					{
						assignUserId: {
							eq: Number(assignTicket),
						},
					},
					{
						contactId: {
							eq: Number(contactTicket),
						},
					},
				],
			},
		}),
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const TicketsData = Tickets?.ticket_getListByBusinessId?.result;

	const { mutate: editTicket } = useTicket_EditMutation();

	// -------------------------------------functions
	const OnDragEnd = (result) => {
		const { source, destination } = result;

		const start = columns.find((column) => column.id === source.droppableId);

		const end = columns.find((column) => column.id === destination.droppableId);

		const filterTicketsData = TicketsData?.items.filter(
			(resolveTicket) => Number(resolveTicket?.id) === Number(result?.draggableId)
		);

		if (start?.id !== end?.id) {
			editTicket(
				{
					ticketId: Number(result?.draggableId),
					input: {
						contactId: filterTicketsData[0]?.contact?.id,
						assignUserId: filterTicketsData[0]?.assignUser?.id,
						status:
							filterTicketsData[0]?.status === TicketStatus?.Resolved
								? TicketStatus?.Unresolved
								: TicketStatus?.Resolved,
						startDate: filterTicketsData[0]?.startDate,
						endDate: filterTicketsData[0]?.endDate,
						estimate: filterTicketsData[0]?.estimate,
						summary: filterTicketsData[0]?.summary,
						description: filterTicketsData[0]?.description,
						isAppointment: filterTicketsData[0]?.isAppointment,
					},
				},
				{
					onSuccess: (data) => {
						const { status, result } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar(status.description, { variant: 'success' });
							queryClient.refetchQueries(['ticket_getListByBusinessId']);
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		} else {
			enqueueSnackbar('You cant move verticaly, please move tikets between 2 columns', { variant: 'warning' });
		}
	};

	return (
		<Stack>
			{
				<Header
					businessId={businessId}
					setBusinessId={setBusinessId}
					contactTicket={contactTicket}
					setContactTicket={setContactTicket}
					assignTicket={assignTicket}
					setAssignTicket={setAssignTicket}
					creatorTicket={creatorTicket}
					setCreatorTicket={setCreatorTicket}
				/>
			}

			<DragDropContext onDragEnd={OnDragEnd}>
				<Grid container spacing={4}>
					{columns.map((column) => (
						<Droppable key={column.id} droppableId={column.id}>
							{(provided) => (
								<Grid item xs={6} {...provided.droppableProps} ref={provided.innerRef}>
									<Stack
										justifyContent={'space-between'}
										alignItems={'start'}
										bgcolor={theme?.palette?.infuuse?.gray400}
										borderRadius={2}
									>
										<Stack borderRadius={'8px 8px 0 0'} width={'100%'} p={2} height={'100%'}>
											<Stack
												direction={'row'}
												justifyContent={'space-between'}
												alignItems={'center'}
											>
												<Typography
													fontWeight={'bold'}
													fontSize={'16px'}
													color={theme?.palette?.infuuse?.blue500}
												>
													{column.name}
												</Typography>
												{column?.id === '1' ? (
													<Box
														p={'8px 14px'}
														bgcolor={theme?.palette?.infuuse?.blue100}
														display={'flex'}
														justifyContent={'center'}
														alignItems={'center'}
														borderRadius={'360px'}
													>
														<Typography
															color={theme?.palette?.common?.white}
															fontWeight={'bold'}
														>
															{
																TicketsData?.items?.filter(
																	(item) => item?.status === TicketStatus?.Unresolved
																).length
															}
														</Typography>
													</Box>
												) : (
													<Box
														p={'8px 14px'}
														bgcolor={theme?.palette?.infuuse?.blue100}
														display={'flex'}
														justifyContent={'center'}
														alignItems={'center'}
														borderRadius={'360px'}
													>
														<Typography
															color={theme?.palette?.common?.white}
															fontWeight={'bold'}
														>
															{
																TicketsData?.items?.filter(
																	(item) => item?.status === TicketStatus?.Resolved
																).length
															}
														</Typography>
													</Box>
												)}
											</Stack>

											<Divider sx={{ m: 1 }} />
										</Stack>

										{column?.id === '1' && (
											<Stack
												p={'0 16px 16px 16px'}
												width={'100%'}
												height={'100%'}
												maxHeight={{ lg: '60vh', xlg: '100%' }}
												overflow={'auto'}
											>
												{TicketsData?.items
													?.filter((item) => item?.status === TicketStatus?.Unresolved)
													?.map((ticket, index) => {
														return (
															<Draggable
																key={ticket?.id}
																draggableId={`${ticket?.id}`}
																index={index}
															>
																{(provided) => (
																	<Stack
																		{...provided.dragHandleProps}
																		{...provided.draggableProps}
																		ref={provided.innerRef}
																	>
																		<TicketCart ticket={ticket} />
																	</Stack>
																)}
															</Draggable>
														);
													})}
												{provided.placeholder}
											</Stack>
										)}

										{column?.id === '2' && (
											<Stack
												p={'0 16px 16px 16px'}
												width={'100%'}
												height={'100%'}
												maxHeight={{ lg: '60vh', xlg: '100%' }}
												overflow={'auto'}
											>
												{TicketsData?.items
													?.filter((item) => item?.status === TicketStatus?.Resolved)
													?.map((ticket, index) => {
														return (
															<Draggable
																key={ticket?.id}
																draggableId={`${ticket?.id}`}
																index={index}
															>
																{(provided) => (
																	<Stack
																		{...provided.dragHandleProps}
																		{...provided.draggableProps}
																		ref={provided.innerRef}
																	>
																		<TicketCart ticket={ticket} />
																	</Stack>
																)}
															</Draggable>
														);
													})}
												{provided.placeholder}
											</Stack>
										)}
									</Stack>
								</Grid>
							)}
						</Droppable>
					))}
				</Grid>
			</DragDropContext>
		</Stack>
	);
};

export default dynamic(() => Promise.resolve(TicketColumns), { ssr: false });
