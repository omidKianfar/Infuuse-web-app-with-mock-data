import PhoneIcon from '@/assets/phone-icon';
import { useTwilio } from '@/providers/Twilio/provider';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Box, Divider, Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import { useRef, useState } from 'react';

interface Props {
	businessNumber: string | null | undefined;
}

const Dilar = ({ businessNumber }: Props) => {
	//  -------------------------------tools
	const theme = useTheme();

	const { handleDial, activeConnection, handleDisconnect } = useTwilio();

	//  -------------------------------states
	const [PhoneNumber, setPhoneNumber] = useState<string>('');
	const [callItem, setCallItem] = useState<boolean>(false);

	//  -------------------------------functions
	// add number to input
	const handleClickNumber = (index: number) => {
		if (PhoneNumber.length >= 13) return;

		if (index === -1) {
			setPhoneNumber((prevState) => `${prevState}+`);
			return;
		}

		setPhoneNumber((prevState) => prevState + index);
	};

	// remove number
	const handleRemoveEndNumber = () => {
		setPhoneNumber((prevState) => prevState.slice(0, prevState.length - 1));
	};

	const inputRef = useRef<HTMLInputElement>(null);

	// call
	const callHndler = () => {
		if (businessNumber && PhoneNumber) {
			handleDial(businessNumber as string, PhoneNumber);
		}
	};

	const endCallHandler = () => {
		handleDisconnect();
		setCallItem(false);
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
				p={'16px'}
				borderRadius={2}
			>
				<Stack>
					{/* your number */}
					<Stack textAlign={'center'}>
						<CustomTypography mb={1}>You'r Phone number</CustomTypography>
						<CustomTypography>{businessNumber}</CustomTypography>
					</Stack>

					<Divider sx={{ m: 1 }} />

					{/* customer number */}
					<Stack textAlign={'center'}>
						<CustomTypography>Customer Phone number</CustomTypography>

						<CustomTextField
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
							value={PhoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							ref={inputRef}
						/>
					</Stack>
					{activeConnection === null ? (
						<Stack>
							{/* 0-9 */}

							<Grid container>
								{Array(9)
									.fill(null)
									.map((_, index) => (
										<Grid item xs={4} mb={2}>
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
										fill={
											callItem ? theme?.palette?.common?.white : theme?.palette?.infuuse?.green300
										}
									/>
								</DilarButton>
							</Stack>
						</Stack>
					) : (
						<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={2}>
							<DilarButton
								boxShadow={2}
								// onMouseOver={() => setCallItem(true)}
								// onMouseLeave={() => setCallItem(false)}
								onClick={endCallHandler}
								sx={{
									background: theme?.palette?.infuuse.red300,
								}}
							>
								<PhoneIcon fill={theme?.palette?.common?.white} />
							</DilarButton>
						</Stack>
					)}
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

export const CustomTextField = styled('input')(({ theme }) => ({
	border: 'none',
	background: 'transparent',
	outline: 'none',
	height: '50px',
	textAlign: 'center',
	fontSize: '18px',
	color: theme?.palette?.infuuse?.blue100,
	fontWeight: 'bold',
}));
