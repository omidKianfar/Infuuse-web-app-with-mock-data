import PhoneIcon from '@/assets/phone-icon';
import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useTwilio } from '@/providers/Twilio/provider';
import callBusinessStore from '@/store/call-business.store';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Box, Divider, Grid, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

const Dilar = () => {
	//  -------------------------------tools
	const theme = useTheme();
	const { businessInfo, setBusinessInfo, handleDial } = useTwilio();

	//  -------------------------------state managment
	const { twilioBusinessId } = useSnapshot(callBusinessStore);

	//  -------------------------------states
	const [myPhoneNumber, setMyPhoneNumber] = useState({
		businessId: '',
		phoneNumber: '',
	});

	const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>('');

	const [callItem, setCallItem] = useState<boolean>(false);

	// -------------------------------ref
	const inputRef = useRef();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// -------------------------------func
	useEffect(() => {
		if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
			if (twilioBusinessId === null) {
				callBusinessStore.twilioBusinessId = CurrentUser?.businessAccesses[0]?.business?.id;
			}
		} else {
			if (twilioBusinessId === null) {
				callBusinessStore.twilioBusinessId = myPhoneNumber?.businessId;
			}
		}
	}, [CurrentUser, twilioBusinessId]);

	//  -------------------------------functions
	//

	// add number to input
	const handleClickNumber = (index: number) => {
		if (customerPhoneNumber.length >= 13) return;

		if (index === -1) {
			setCustomerPhoneNumber((prevState) => `${prevState}+`);
			return;
		}

		setCustomerPhoneNumber((prevState) => prevState + index);
	};

	// remove number
	const handleRemoveEndNumber = () => {
		setCustomerPhoneNumber((prevState) => prevState.slice(0, prevState.length - 1));
	};

	// call
	const callHndler = () => {
		console.log('CurrentUser?.user?.userType', CurrentUser?.user?.userType);

		if (CurrentUser?.user?.userType === UserType?.BusinessMember) {
			console.log('businessInfo?.phoneNumber', businessInfo?.phoneNumber);
			console.log('customerPhoneNumber', customerPhoneNumber);

			handleDial(businessInfo?.phoneNumber, customerPhoneNumber);
		} else {
			if (myPhoneNumber?.phoneNumber !== '') {
				handleDial(myPhoneNumber?.phoneNumber, customerPhoneNumber);
			} else {
				enqueueSnackbar('Please choose your phone number', { variant: 'error' });
			}
		}
	};

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			justifyContent={'center'}
			alignItems={'start'}
			overflow={'auto'}
			onClick={() => inputRef?.current?.focus()}
		>
			{/* -------------------------------dilar */}
			<Stack
				width={'100%'}
				height={'100%'}
				bgcolor={theme?.palette?.infuuse?.gray400}
				p={'24px 16px'}
				borderRadius={2}
			>
				<Stack>
					{/* your number */}
					{CurrentUser?.user?.userType === UserType?.BusinessMember ? (
						<Stack textAlign={'center'}>
							<CustomTypography mb={1}>You'r Phone number</CustomTypography>
							<CustomTypography>{businessInfo?.phoneNumber}</CustomTypography>
						</Stack>
					) : (
						<Stack textAlign={'center'}>
							<CustomTypography mb={1}>You'r Phone number</CustomTypography>
							<CustomTextField name="phoneNumber" fullWidth select value={businessInfo?.businessId}>
								{CurrentUser?.businessAccesses?.map((business) => (
									<MenuItem
										key={business?.business?.id}
										value={business?.business?.id}
										onClick={() =>
											setBusinessInfo(
												business?.business?.id as number,
												business?.business?.twilioPhoneNumber?.phoneNumber as string
											)
										}
									>
										{business?.business?.twilioPhoneNumber?.phoneNumber}
									</MenuItem>
								))}
							</CustomTextField>
						</Stack>
					)}
					<Divider sx={{ m: 2 }} />

					{/* customer number */}
					<Stack textAlign={'center'}>
						<CustomTypography>Customer Phone number</CustomTypography>

						<CustomInput
							type="tel"
							pattern="^\+?[0-9]*$"
							maxLength={16}
							onBeforeInput={(e: any) => {
								const value = e.currentTarget.value;
								const key = e.data;

								if (!/[0-9]/.test(key)) {
									if (!(key === '+' && value.length === 0)) {
										e.preventDefault();
									}
								}
							}}
							value={customerPhoneNumber}
							onChange={(e) => setCustomerPhoneNumber(e.target.value)}
							ref={inputRef}
						/>
					</Stack>

					<Stack>
						{/* 0-9 */}
						<Grid container>
							{Array(9)
								.fill(null)
								.map((_, index) => (
									<Grid item xs={4} mb={2} key={index}>
										<GridCenter container>
											<DilarButton
												boxShadow={2}
												key={index}
												onClick={() => {
													handleClickNumber(index + 1);
												}}
											>
												{index + 1}
											</DilarButton>
										</GridCenter>
									</Grid>
								))}
						</Grid>

						{/* + */}
						<Grid container>
							<Grid item xs={4}>
								<GridCenter container>
									<DilarButton
										boxShadow={2}
										onClick={() => {
											handleClickNumber(-1);
										}}
									>
										+
									</DilarButton>
								</GridCenter>
							</Grid>

							{/* 0 */}
							<Grid item xs={4}>
								<GridCenter container>
									<DilarButton
										boxShadow={2}
										onClick={() => {
											handleClickNumber(0);
										}}
									>
										0
									</DilarButton>
								</GridCenter>
							</Grid>

							{/* delete */}
							<Grid item xs={4}>
								<GridCenter container>
									<DilarButton boxShadow={2} onClick={handleRemoveEndNumber} pr={0.3}>
										<BackspaceIcon />
									</DilarButton>
								</GridCenter>
							</Grid>
						</Grid>

						{/* call */}
						<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={2}>
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
									fill={callItem ? theme?.palette?.common?.white : theme?.palette?.infuuse?.green300}
								/>
							</DilarButton>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Dilar;

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

export const CustomTypography = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 'bold',
	color: theme?.palette?.infuuse?.blue500,
}));

export const GridCenter = styled(Grid)(({ theme }) => ({
	justifyContent: 'center',
	alignItems: 'center',
}));

export const CustomInput = styled('input')(({ theme }) => ({
	border: 'none',
	background: 'transparent',
	outline: 'none',
	height: '50px',
	textAlign: 'center',
	fontSize: '18px',
	color: theme?.palette?.infuuse?.blue100,
	fontWeight: 'bold',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme?.palette?.infuuse?.gray100,
		borderRadius: '16px',
		height: '40px',
		'& .MuiInputBase-input': {
			color: theme?.palette?.common?.black,
			height: '40px',

			// borderRadius: "16px",
		},
		'& fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
			height: '40px',

			// borderRadius: "16px",
		},
		'&.Mui-focused fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
			height: '40px',

			// borderRadius: "16px",
		},
		'&:hover fieldset': {
			borderColor: theme?.palette?.infuuse?.gray100,
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
