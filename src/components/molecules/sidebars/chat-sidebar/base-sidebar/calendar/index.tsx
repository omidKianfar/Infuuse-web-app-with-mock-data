import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Stack,
	Typography,
	styled,
	useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { DateTimePicker, FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import { NextButton } from '@/components/atoms/Button';
import { BaseSidebarContext } from '..';
import CloseIconBox from '@/assets/close-icon-box';
import {
	AgencyMemberAssignmentStatus,
	SortEnumType,
	TicketStatus,
	TypeContactNetwork,
	useBusiness_GetListAgencyRequestsQuery,
	useBusiness_GetTeamByBusinessIdQuery,
	useContactNetwork_GetListByContactIdQuery,
	useConversation_GetConversationByContactIdQuery,
	useConversationMember_AddListMutation,
	UserType,
	useTicket_AddMutation,
	useTwilio_GenerateVideoRoomMutation,
	useTwilio_SendSmsMutation,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import AssignSearch from '@/components/atoms/search/assign-search';
import dayjs from 'dayjs';
import ContactHaveNumberSearch from '@/components/atoms/search/cantact-have-number-search';

const CalendarSidebar = () => {
	const theme = useTheme();
	const queryClient = useQueryClient();

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	const [BusinessId, setBusinessId] = useState<number>(Number(CurrentUser?.businessAccesses[0]?.business?.id));
	const [choosenContactId, setChoosenContactId] = useState<number | null>(null);
	const [choosenContactName, setChoosenContactName] = useState<string | null>(null);
	const [choosenAssignUserId, setChoosenAssignUserId] = useState<number | null>(null);
	const [choosenAssignUserName, setChoosenAssignUserName] = useState<string | null>(null);
	const [checkedSMS, setCheckedSMS] = useState(false);
	const [checkedCalendar, setCheckedCalendar] = useState(true);
	const [room, setRoom] = useState(null);
	const [SendVia, setSendVia] = useState({
		type: null,
		id: null,
		value: null,
	});

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

	const { data: TeamMembers } = useBusiness_GetTeamByBusinessIdQuery({
		businessId: Number(BusinessId),
		permissionType: null,
		skip: 0,
		take: 1,
		where: {
			id: {
				eq: Number(choosenAssignUserId)
			}
		},
	});
	const TeamMembersData = TeamMembers?.business_getTeamByBusinessId?.result;

	const { data: ContactConverastion } = useConversation_GetConversationByContactIdQuery({
		contactId: Number(choosenContactId)
	});
	const ContactConverastionData = ContactConverastion?.conversation_getConversationByContactId?.result;

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

	const { mutate: addTicket } = useTicket_AddMutation();
	const { mutate: assignUsers } = useConversationMember_AddListMutation()
	const { mutate: sendSMS } = useTwilio_SendSmsMutation();
	const { mutate: twilioLinkGenerate } = useTwilio_GenerateVideoRoomMutation();


	const MyLocation = (location.origin);
	const url = `${MyLocation}/video-call?code=${room}`;

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

	const defaultValues = {
		summery: '',
		description: '',
		startDate: new Date(),
		endDate: new Date(),
		estimate: 0,
	};

	const methods = useForm({
		resolver: yupResolver(TicketSchema),
		defaultValues,
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = (values: typeof defaultValues) => {
		const TicketData = `Summery: ${values?.summery}\nDescription: ${values?.description}\nEstimate: ${values?.estimate}\nStart: ${values?.startDate}\nEnd: ${values?.endDate}\n${room ? url : ''}`

		if (checkedCalendar && checkedSMS) {
			addTicket(
				{
					businessId: Number(BusinessId),
					input: {
						contactId: choosenContactId ? Number(choosenContactId) : null,
						assignUserId: choosenAssignUserId !== null ? Number(choosenAssignUserId) : null,
						status: TicketStatus?.Unresolved,
						startDate: values?.startDate,
						endDate: values?.endDate,
						estimate: values?.estimate,
						summary: values?.summery,
						description: values?.description,
						meetingLink: room ? url : null,
						isAppointment: true,
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
															setSidebars({
																...sidebars,
																calendar: false,
															})
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
			addTicket(
				{
					businessId: Number(BusinessId),
					input: {
						contactId: choosenContactId ? Number(choosenContactId) : null,
						assignUserId: choosenAssignUserId !== null ? Number(choosenAssignUserId) : null,
						status: TicketStatus?.Unresolved,
						startDate: values?.startDate,
						endDate: values?.endDate,
						estimate: values?.estimate,
						summary: values?.summery,
						description: values?.description,
						meetingLink: room ? url : null,
						isAppointment: true,
					},
				},
				{
					onSuccess: (data) => {
						const { status } = responseDestructure(data);
						if (status.code == 1) {
							enqueueSnackbar(status.description, { variant: 'success' });
							reset();
							queryClient.refetchQueries(['ticket_getListByBusinessId']);
							setSidebars({
								...sidebars,
								calendar: false,
							})
							
						} else {
							enqueueSnackbar(status.description, { variant: 'error' });
						}
					},
				}
			);
		}
	};

	const CheckSMSHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedSMS(event.target.checked);
	};

	const CheckCalendarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedCalendar(event.target.checked);
	};

	return (
		<Stack
			width={'360px'}
			height={'100%'}
			sx={{
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollbarWidth: 'none',
				scrollbarColor: 'transparent transparent',
			}}
			bgcolor={theme?.palette?.infuuse?.gray200}
			p={2}
			borderRadius={2}
		>
			{/* -------------------------------haeder */}
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						Create New Calendar
					</Typography>
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Box
							sx={{ cursor: 'pointer' }}
							onClick={() =>
								setSidebars({
									...sidebars,
									calendar: false,
								})
							}
						>
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
								<TextField name="estimate" fullWidth type="number" />
							</Stack>

							<Stack>
								<Label mb={'4px'}>Business</Label>
								{CurrentUser?.user?.userType === UserType?.AgencyMember ? (
									<TextField name="business" fullWidth select value={BusinessId}>
										{BusinessRequestsData?.items?.map((business) => (
											<MenuItem
												key={business?.business?.id}
												value={business?.business?.id}
												onClick={() => setBusinessId(business?.business?.id as number)}
											>
												{business?.business?.name}
											</MenuItem>
										))}
									</TextField>
								) : (
									<TextField
										name="companyName"
										disabled
										fullWidth
										value={CurrentUser?.businessAccesses[0]?.business?.name}
									/>
								)}{' '}
							</Stack>
						</Stack>

						<Stack mt={2}>
							{/* -------------------------------saerch */}
							{/* assign */}
							<AssignSearch
								BusinessId={Number(BusinessId)}
								choosenAssignUserId={choosenAssignUserId}
								setChoosenAssignUserId={setChoosenAssignUserId}
								choosenAssignUserName={choosenAssignUserName}
								setChoosenAssignUserName={setChoosenAssignUserName}
							/>

							{/* contact */}
							{BusinessId && (
								<ContactHaveNumberSearch
									choosenContactId={choosenContactId}
									setChoosenContactId={setChoosenContactId}
									choosenContactName={choosenContactName}
									setChoosenContactName={setChoosenContactName}
									BusinessId={BusinessId}
								/>
							)}
						</Stack>

						<Stack mb={1} justifyContent={'center'} alignItems={'center'} >
							<NextButton onClick={linkGeneration} sx={{ backgroundColor: theme?.palette?.infuuse?.green300, width: '200px', height: '36px' }}>
								Generate Video Call Link
							</NextButton>

							{room &&
								<Stack width={'340px'} >
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
								</Stack>}
						</Stack>

						<Stack>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={true} onChange={CheckCalendarHandler} />}
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

export default CalendarSidebar;

const TicketSchema = Yup.object().shape({
	summery: Yup.string().required('Enter Your Summery'),
	description: Yup.string().required('Enter Your Description'),
	startDate: Yup.date().required('Enter Your Start Date'),
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
	estimate: Yup.number().required('Enter Your Estimate'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomDescription = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '100px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.infuuse.blueLight400,
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse.blue100,
		},
	},
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',

		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,

		},
		'& fieldset': {
			borderColor: theme?.palette?.common?.white,

		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.common?.white,

		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.common?.white,
		},
	},
	'& label.Mui-focused': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'&.MuiFormLabel-root .Mui-disabled': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
	'& label.Mui-root': {
		color: theme?.palette?.common?.black,
		fontSize: '14px',
	},
}));