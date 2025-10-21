import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DateTimePicker, FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import CloseIconBox from '@/assets/close-icon-box';
import {
	AgencyMemberAssignmentStatus,
	SortEnumType,
	TypeContactNetwork,
	useBusiness_GetListAgencyRequestsQuery,
	useContactNetwork_GetListByContactIdQuery,
	useConversation_GetConversationByContactIdQuery,
	useConversationMember_AddListMutation,
	useTicket_EditMutation,
	useTicket_GetListByBusinessIdQuery,
	useTwilio_GenerateVideoRoomMutation,
	useTwilio_SendSmsMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import ticketStore from '@/store/ticket.store';
import AssignSearch from '@/components/atoms/search/assign-search';
import dayjs from 'dayjs';
import ContactHaveNumberSearch from '@/components/atoms/search/cantact-have-number-search';
import { CustomDescription, CustomTextField, Label } from './styles';


interface Props {
	businessId: number
}

interface DefaultValuesType {
	summery: string;
	description: string;
	startDate: Date;
	endDate: Date;
	estimate: string;
}

const EditTicketSidebar = ({ businessId }: Props) => {
	// ------------------------------- tools
	const theme = useTheme();
	const queryClient = useQueryClient();

	// -------------------------------context
	const { ticketSidebar, ticketId } = useSnapshot(ticketStore);

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;


	// -------------------------------query
	// tickets
	const { data: Tickets } = useTicket_GetListByBusinessIdQuery({
		businessId: Number(businessId),
		skip: 0,
		take: 10000,
		where: {
			id: {
				eq: Number(ticketId),
			},
		},
	});

	const TicketsData = Tickets?.ticket_getListByBusinessId?.result;

	// -------------------------------states
	const [choosenContactId, setChoosenContactId] = useState<number | null>(
		ticketId !== null && TicketsData?.items[0]?.contact?.id ? Number(TicketsData?.items[0]?.contact?.id) : null
	);

	const [choosenContactName, setChoosenContactName] = useState<string | null>(
		ticketId !== null && TicketsData?.items[0]?.contact?.fullName
			? (TicketsData?.items[0]?.contact?.fullName as string)
			: null
	);

	const [choosenAssignUserId, setChoosenAssignUserId] = useState<number | null>(
		ticketId !== null && TicketsData?.items[0]?.assignUser?.id
			? Number(TicketsData?.items[0]?.assignUser?.id)
			: null
	);

	const [choosenAssignUserName, setChoosenAssignUserName] = useState<string | null>(
		ticketId !== null && TicketsData?.items[0]?.assignUser?.fullName
			? (TicketsData?.items[0]?.assignUser?.fullName as string)
			: null
	);

	const [checkedSMS, setCheckedSMS] = useState(false);
	const [checkedCalendar, setCheckedCalendar] = useState(false);

	const [room, setRoom] = useState(null);

	const [SendVia, setSendVia] = useState({
		type: null,
		id: null,
		value: null,
	});

	// -------------------------------------functions
	useEffect(() => {
		if (Tickets) {
			setChoosenContactId(
				ticketId !== null && TicketsData?.items[0]?.contact?.id
					? Number(TicketsData?.items[0]?.contact?.id)
					: null
			);
			setChoosenContactName(
				ticketId !== null && TicketsData?.items[0]?.contact?.fullName
					? (TicketsData?.items[0]?.contact?.fullName as string)
					: null
			);
			setChoosenAssignUserId(
				Number(
					ticketId !== null && TicketsData?.items[0]?.assignUser?.id
						? Number(TicketsData?.items[0]?.assignUser?.id)
						: null
				)
			);
			setChoosenAssignUserName(
				ticketId !== null && TicketsData?.items[0]?.assignUser?.fullName
					? (TicketsData?.items[0]?.assignUser?.fullName as string)
					: null
			);
			setCheckedCalendar(
				ticketId !== null && TicketsData?.items[0]?.isAppointment
					? true
					: false
			);
		}
	}, [Tickets]);

	// -------------------------------query
	// get businesses
	const { data: businessRequests } = useBusiness_GetListAgencyRequestsQuery({
		skip: 0,
		take: 10000,
		where: {
			status: {
				eq: AgencyMemberAssignmentStatus?.Approved,
			},
		},
	});
	const BusinessRequestsData = businessRequests?.business_getListAgencyRequests?.result;

	// get Contact conversation
	const { data: ContactConverastion } = useConversation_GetConversationByContactIdQuery({
		contactId: Number(choosenContactId)
	});
	const ContactConverastionData = ContactConverastion?.conversation_getConversationByContactId?.result;

	// contact networks
	const Network = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(choosenContactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const NetworkData = Network?.data?.contactNetwork_getListByContactId?.result;

	// edit ticket
	const { mutate: editTicket } = useTicket_EditMutation();
	const { mutate: assignUsers } = useConversationMember_AddListMutation()
	const { mutate: sendSMS } = useTwilio_SendSmsMutation();
	const { mutate: twilioLinkGenerate } = useTwilio_GenerateVideoRoomMutation();

	// --------------------------------------states
	const MyLocation = (location.origin);
	const url = `${MyLocation}/video-call?code=${room}`;

	// --------------------------------------function
	// video url link generater
	const linkGeneration = () => {
		twilioLinkGenerate(
			{},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						setRoom(result?.roomName);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	// -------------------------------form
	const defaultValues: DefaultValuesType = {
		summery: TicketsData?.items[0]?.summary || '',
		description: TicketsData?.items[0]?.description || '',
		startDate: TicketsData?.items[0]?.startDate || new Date(),
		endDate: TicketsData?.items[0]?.endDate || new Date(),
		estimate: TicketsData?.items[0]?.estimate || '',
	};

	const methods = useForm({
		resolver: yupResolver(TicketSchema),
		values: defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: any) => {
		// calendar
		if (checkedSMS) {
			// sms
			if (choosenContactId) {
				const TicketData = `Summery: ${values?.summery}\nDescription: ${values?.description}\nEstimate: ${values?.estimate}\nStart: ${values?.startDate}\nEnd: ${values?.endDate}\n${room ? url : ''}`

				editTicket(
					{
						ticketId: Number(ticketId),
						input: {
							contactId: choosenContactId ? Number(choosenContactId) : null,
							assignUserId: choosenAssignUserId !== null ? Number(choosenAssignUserId) : null,
							status: TicketsData?.items[0]?.status,
							startDate: values?.startDate,
							endDate: values?.endDate,
							estimate: Number(values?.estimate),
							summary: values?.summery,
							description: values?.description,
							meetingLink: room ? url : null,
							isAppointment: checkedCalendar,
						},
					},
					{
						onSuccess: (data) => {
							const { status } = responseDestructure(data);
							if (status.code == 1) {
								assignUsers(
									{
										conversationId: Number(ContactConverastionData?.id),
										users: [Number(choosenAssignUserId), Number(CurrentUser?.user?.id)]
									},
									{
										onSuccess: (data) => {
											const { status, result } = responseDestructure(data);
											if (status.code == 1) {
												sendSMS(
													{
														conversationId: Number(ContactConverastionData?.id),
														input: {
															contactNetworkId: Number(SendVia?.id),
															to: SendVia?.value,
															message: TicketData,
															sendAsMMS: false,
														},
													},
													{
														onSuccess: (data) => {
															const { status, result } = responseDestructure(data);
															if (status.code == 1) {
																enqueueSnackbar(status.description, { variant: 'success' });
																reset();
																queryClient.refetchQueries(['ticket_getListByBusinessId']);
																queryClient.invalidateQueries(['conversationMessage_getByConversationId'])
																queryClient.invalidateQueries(['conversation_getList'])
																ticketStore.ticketSidebar = false
															} else {
																enqueueSnackbar(status.description, { variant: 'error' });
															}
														},
													}
												);

											} else {
												enqueueSnackbar(status.description, { variant: 'error' });
											}
										},
									}
								);
							} else {
								enqueueSnackbar(status.description, { variant: 'error' });
							}
						},
					}
				);
			} else {
				enqueueSnackbar('Please choose a contact', { variant: 'error' });
			}
		} else {
			editTicket(
				{
					ticketId: Number(ticketId),
					input: {
						contactId: choosenContactId ? Number(choosenContactId) : null,
						assignUserId: choosenAssignUserId !== null ? Number(choosenAssignUserId) : null,
						status: TicketsData?.items[0]?.status,
						startDate: values?.startDate,
						endDate: values?.endDate,
						estimate: Number(values?.estimate),
						summary: values?.summery,
						description: values?.description,
						meetingLink: room ? url : null,
						isAppointment: checkedCalendar,
					},
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar(status.description, { variant: 'success' });
							reset();
							queryClient.refetchQueries(['ticket_getListByBusinessId']);
							ticketStore.ticketSidebar = false
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}

	};

	// -------------------------------functions
	const CheckSMSHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedSMS(event.target.checked);
	};

	const CheckCalendarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedCalendar(event.target.checked);
	};

	const ExitTicketHandeler = () => {
		ticketStore.ticketSidebar = false;
		ticketStore.ticketId = null;
	};

	return (
		<Stack
			width={'380px'}
			height={'100%'}
			maxHeight={'84vh'}
			sx={{
				overflowY: 'auto',
			}}
			bgcolor={theme?.palette?.infuuse?.gray400}
			p={2}
			borderRadius={2}
			ml={2}
		>
			{/* -------------------------------haeder */}
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						Ticket
					</Typography>
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Box sx={{ cursor: 'pointer' }} onClick={ExitTicketHandeler}>
							<CloseIconBox />
						</Box>
					</Stack>
				</Stack>

				<Stack>
					{/* -------------------------------form */}
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						{/* -------------------------------fields */}
						<Stack>
							<Stack width={'100%'}>
								<Label mb={'4px'}>Summery</Label>
								<TextField name="summery" fullWidth />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Description</Label>
								<CustomDescription name="description" fullWidth rows={3} multiline />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Start</Label>
								<DateTimePicker name="startDate" label={''} />
							</Stack>

							<Stack>
								<Label mb={'4px'}>End</Label>
								<DateTimePicker name="endDate" label={''} />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Estimate</Label>
								<TextField name="estimate" fullWidth  />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Business</Label>

								<TextField
									name="business"
									disabled
									fullWidth
									value={TicketsData?.items[0]?.business?.name}
								/>

							</Stack>
						</Stack>

						<Stack mt={2}>
							{/* -------------------------------saerch */}
							{/* assign */}
							<AssignSearch
								BusinessId={Number(TicketsData?.items[0]?.business?.id)}
								choosenAssignUserId={choosenAssignUserId}
								setChoosenAssignUserId={setChoosenAssignUserId}
								choosenAssignUserName={choosenAssignUserName}
								setChoosenAssignUserName={setChoosenAssignUserName}
							/>

							{/* contact */}
							<ContactHaveNumberSearch
								BusinessId={Number(TicketsData?.items[0]?.business?.id)}
								choosenContactId={choosenContactId}
								setChoosenContactId={setChoosenContactId}
								choosenContactName={choosenContactName}
								setChoosenContactName={setChoosenContactName}
							/>
						</Stack>

						<Stack mb={1} justifyContent={'center'} alignItems={'center'}>
							<NextButton onClick={linkGeneration} sx={{ backgroundColor: theme?.palette?.infuuse?.green300, width: '200px', height: '36px' }}>
								Generate Video Call Link
							</NextButton>

							{room ?
								<Stack>
									<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => setRoom(null)}>
										<CloseIconBox />
									</Stack>

									<Box
										border="1px solid #76B7F9"
										bgcolor={theme?.palette?.infuuse?.gray500}
										padding="10px"
										position="relative"
										borderRadius="12px"
										marginTop="7px"
										sx={{ overflowX: 'auto' }}
									>
										<Typography
											fontSize="14px"
											color="#676372"
											component="pre"

										>
											{url}
										</Typography>
									</Box>
								</Stack>
								: TicketsData?.items[0]?.meetingLink
									? <Stack>
										<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => setRoom(null)}>
											<CloseIconBox />
										</Stack>

										<Box
											border="1px solid #76B7F9"
											bgcolor={theme?.palette?.infuuse?.gray500}
											padding="10px"
											position="relative"
											borderRadius="12px"
											marginTop="7px"
											sx={{ overflowX: 'auto' }}
										>
											<Typography
												fontSize="14px"
												color="#676372"
												component="pre"

											>
												{TicketsData?.items[0]?.meetingLink}
											</Typography>
										</Box>
									</Stack>
									: null}
						</Stack>

						<Stack>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={checkedCalendar} onChange={CheckCalendarHandler} />}
									label="Add this ticket to my calendar"
								/>
								{choosenContactId !== null && (
									<FormControlLabel
										control={<Checkbox checked={checkedSMS} onChange={CheckSMSHandler} />}
										label="Send this ticket to the contact as a SMS"
									/>
								)}
							</FormGroup>
						</Stack>

						{choosenContactId !== null &&
							<Stack mt={1}>
								<CustomTextField name='Send Via' value={SendVia?.value} select fullWidth label={'Send Via'}>
									{NetworkData?.items?.map((network) => (
										<MenuItem
											key={network?.value}
											value={network?.value}
											onClick={() => {
												setSendVia({
													type: network?.typeContactNetwork,
													id: network?.id,
													value: network?.value,
												});

											}}
										>
											<Typography
												fontSize={'14px'}
												color={theme?.palette?.infuuse?.blueDark500}
												fontWeight={'bold'}
											>
												{network?.value}
											</Typography>
										</MenuItem>
									))}
								</CustomTextField>
							</Stack>}

						{/* ------------------------------- footer */}
						<Stack width={'100%'} direction={'row'} alignItems={'center'} mt={'50px'}>
							<NextButton type="submit" sx={{ width: '100%', fontSize: '16px', fontWeight: 600 }}>
								Save
							</NextButton>
						</Stack>
					</FormProvider>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditTicketSidebar;

// -------------------------------schema
const TicketSchema = Yup.object().shape({
	summery: Yup.string().required('Enter Your Summery'),
	description: Yup.string().required('Enter Your Description'),
	startDate: Yup.mixed<any>().nullable().required('Start date is required'),
	endDate: Yup.string()
		.typeError('End date must be greather than is start date')
		.test(
			'End date must be greather than is start date',
			'End date must be greather than is start date',
			(currentDate, context) => {
				const CurrentDate = dayjs(currentDate).format('MM/DD/YYYY');
				const CurrentHour = dayjs(currentDate).format('hh:mm A');
				const startDate = dayjs(context?.parent?.startDate).format('MM/DD/YYYY');
				const startHour = dayjs(context?.parent?.startDate).format('hh:mm A');

				return CurrentDate > startDate || (CurrentDate == startDate && CurrentHour > startHour) ? true : false;
			}
		),
	estimate: Yup.string().matches(/^[0-9]*$/, 'Value must be number').required('Enter Your Estimate'),
});


