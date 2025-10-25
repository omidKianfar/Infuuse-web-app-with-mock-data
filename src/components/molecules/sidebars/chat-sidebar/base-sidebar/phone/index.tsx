import CloseIconBox from '@/assets/close-icon-box';
import DilarIcon from '@/assets/dilar-icon';
import PhoneIcon from '@/assets/phone-icon';
import { FormProvider, TextField, Yup, useForm, yupResolver } from '@/components/atoms/Form';
import {
	TypeContactNetwork,
	useBusiness_GetByBusinessIdQuery,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useTwilio } from '@/providers/Twilio/provider';
import callBusinessStore from '@/store/call-business.store';
import { Box, Divider, MenuItem, Stack, Typography, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { BaseSidebarContext } from '..';
import Dilar from './dilar';
import twilioCallTokenStore from '@/store/twilio-call-token.store';

const PhoneSidebar = () => {
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId;
	const BusinessId = router?.query?.businessId;

	const { businessInfo, setBusinessInfo, handleDial, activeConnection } = useTwilio();
	console.log(businessInfo);


	const { twilioBusinessId } = useSnapshot(callBusinessStore);

	const [dilar, setDilar] = useState<boolean>(false);
	const [callItem, setCallItem] = useState<boolean>(false);

	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	const { data: CurrentBusiness } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(BusinessId),
	});

	const businessNumber = CurrentBusiness?.business_getByBusinessId?.result?.twilioPhoneNumber?.phoneNumber;

	const NetworkPhoneNumber = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.PhoneNumber,
			},
		},
	});

	const NetworkPhoneNumberData = NetworkPhoneNumber?.data?.contactNetwork_getListByContactId?.result;

	useEffect(() => {
		callBusinessStore.twilioBusinessId = Number(BusinessId);
	}, [twilioBusinessId]);

	const defaultValues = {
		phone: '',
	};

	const methods = useForm({
		resolver: yupResolver(PhoneSchema),
		defaultValues,
	});

	const { handleSubmit, getValues } = methods;

	const onSubmit = (values: typeof defaultValues) => { };

	const callHndler = () => {
		if (businessNumber && getValues('phone')) {
			handleDial(businessNumber as string, getValues('phone'));
		}
	};

	const endCallHandler = () => {
		setCallItem(false);
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
			{/* -------------------------------header */}
			<Stack>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
					<Typography color={theme?.palette?.infuuse?.blue500} fontWeight={'bold'} fontSize={'18px'}>
						Phone
					</Typography>

					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
						<Box
							sx={{ cursor: 'pointer' }}
							onClick={() =>
								setSidebars({
									...sidebars,
									phone: false,
								})
							}
						>
							<CloseIconBox />
						</Box>
					</Stack>
				</Stack>

				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} p={'4px'}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						bgcolor={theme?.palette?.infuuse?.gray100}
						width={'32px'}
						height={'32px'}
						borderRadius={'360px'}
						boxShadow={4}
						sx={{ cursor: 'pointer' }}
						onClick={() => setDilar(!dilar)}
						mb={1}
					>
						<DilarIcon width="18px" height="18px" />
					</Box>
				</Stack>
				{dilar ? (
					<Dilar businessNumber={businessNumber} />
				) : (
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
						{/* -------------------------------fields */}
						{/* your number */}
						<Stack textAlign={'center'} mt={2}>
							<CustomTypography mb={1}>You'r Phone number</CustomTypography>
							<CustomTypography>{businessNumber}</CustomTypography>
						</Stack>

						<Divider sx={{ m: 2 }} />

						<Stack>
							<Label mb={'4px'}>Select Contact Phone Number</Label>

							<TextField name="phone" fullWidth select>
								{NetworkPhoneNumberData?.items?.map((phoneNumber) => (
									<MenuItem key={phoneNumber?.value} value={phoneNumber?.value}>
										<Typography>{phoneNumber?.value}</Typography>
									</MenuItem>
								))}
							</TextField>
						</Stack>
						{/* ------------------------------- footer */}

						{activeConnection === null ? (
							<Stack
								width={'100%'}
								direction={'row'}
								justifyContent={'center'}
								alignItems={'center'}
								mt={'50px'}
							>
								<DilarButton
									boxShadow={2}
									onMouseOver={() => setCallItem(true)}
									onMouseLeave={() => setCallItem(false)}
									onClick={callHndler}
									sx={{
										'&:hover': {
											background: theme?.palette?.infuuse.green300,
										},
									}}
								>
									<PhoneIcon
										fill={
											callItem ? theme?.palette?.common?.white : theme?.palette?.infuuse?.green300
										}
									/>
								</DilarButton>
							</Stack>
						) : (
							<Stack
								width={'100%'}
								direction={'row'}
								justifyContent={'center'}
								alignItems={'center'}
								mt={'50px'}
							>
								<DilarButton
									boxShadow={2}
									onClick={endCallHandler}
									sx={{
										background: theme?.palette?.infuuse.red300,
									}}
								>
									<PhoneIcon fill={theme?.palette?.common?.white} />
								</DilarButton>
							</Stack>
						)}
					</FormProvider>
				)}
			</Stack>
		</Stack>
	);
};

export default PhoneSidebar;

const PhoneSchema = Yup.object().shape({
	phone: Yup.string().required('Enter Your Phone'),
});

export const Label = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	color: theme?.palette?.infuuse.blueLight500,
	marginBottom: '4px',
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 'bold',
	color: theme?.palette?.infuuse?.blue500,
}));

export const DilarButton = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '360px',
	background: theme?.palette?.infuuse.gray200,
	color: theme?.palette?.infuuse?.blueDark500,
	width: '52px',
	height: '52px',
	cursor: 'pointer',
	fontWeight: 'bold',
	fontSize: '18px',
	'&:hover': {
		background: theme?.palette?.infuuse.blue100,
		color: theme?.palette?.common?.white,
	},
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({


	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.common?.white,
		borderRadius: '16px',
		height: '48px',

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
