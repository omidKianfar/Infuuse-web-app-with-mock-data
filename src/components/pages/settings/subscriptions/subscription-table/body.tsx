import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';
import dayjs from 'dayjs';
import SubscriptionIcon from '@/assets/subscription-icon';
import ModalContainer from '@/components/atoms/Modal';
import { PackageDuration, PaymentHistory, PaymentStatus, PaymentType, usePayment_CreatePaymentIntentForCustomPackageMutation } from '@/graphql/generated';
import PaymentIcon from '@mui/icons-material/Payment';
import PayPendingSubscription from './modal/pay-pending-payment';
import CancelSubscription from './modal/cancel-payment';
import { enqueueSnackbar } from 'notistack';
import { responseDestructure } from '@/utils';
interface Props {
	payment: PaymentHistory
}

const Body = ({ payment }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	const { mutate: createPaymentIntent } = usePayment_CreatePaymentIntentForCustomPackageMutation();

	const [ClientSecret, setClientSecret] = useState<string | null>(null)
	const [publishKey, setPublishKey] = useState<string | null>(null)

	const handelIntentCart = () => {
		createPaymentIntent(
			{
				packageId: Number(payment?.id)
			},
			{
				onSuccess: (data) => {
					const { status, result } = responseDestructure(data);
					if (status.code == 1) {
						setClientSecret(result?.clientSecret)
						setPublishKey(result?.publishKey)
						handelModal(1)
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);

	}

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);
	const [counter, setCounter] = React.useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = (num: number) => {
		setCounter(num)
		handleOpen();
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<SubscriptionIcon />

					<Stack ml={1}>
						<Typography fontSize={'14px'} >
							{payment?.paymentType === PaymentType?.Intent ? 'custom package' : 'Subscription'}
						</Typography>

						<Typography fontSize={'12px'} mt={1}>
							{payment?.packageDuration === PackageDuration?.OneMonth ? 'One Month'
								: payment?.packageDuration === PackageDuration?.ThreeMonth ? 'Three Month'
									: payment?.packageDuration === PackageDuration?.SixMonth ? 'Six Month'
										: payment?.packageDuration === PackageDuration?.Year ? 'One Year'
											: payment?.packageDuration === PackageDuration?.LifeTime ? 'Life Time'
												: null}
						</Typography>

					</Stack>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{payment?.operatorCount}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>${payment?.totalPrice}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						borderRadius={4}
						bgcolor={theme?.palette?.infuuse?.red300}
						p={' 8px'}
						color={theme?.palette?.common?.white}
					>
						${payment?.discount}
					</Box>
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{payment?.expireDate ? dayjs(payment?.expireDate).format('MM/DD/YYYY') : 'Pendding'}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{payment?.paymentType === PaymentType?.CanceledSubscription
						? 'Canceled'
						: payment?.paymentStatus === PaymentStatus?.Paid
							? 'Paid' : payment?.paymentStatus === PaymentStatus?.Failed
								? 'Failed'
								: 'Pending'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				{payment?.paymentType === PaymentType?.Intent && payment?.paymentStatus === PaymentStatus?.Pending
					? <Box onClick={handelIntentCart} sx={{ cursor: 'pointer' }}>
						<PaymentIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
					</Box>
					: payment?.paymentType === PaymentType?.ActiveSubscription && payment?.paymentStatus === PaymentStatus?.Paid
						? <Box onClick={() => handelModal(2)}>
							<Button variant='text' color='warning'>Cancel</Button>
						</Box>
						: null}
			</StyledTableCell>

			<ModalContainer open={open} handleClose={handleClose}>
				{counter === 1 ? <PayPendingSubscription handleClose={handleClose} ClientSecret={ClientSecret} publishKey={publishKey} />
					: counter === 2 ? <CancelSubscription handleClose={handleClose} payment={payment} />
						: null}
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
