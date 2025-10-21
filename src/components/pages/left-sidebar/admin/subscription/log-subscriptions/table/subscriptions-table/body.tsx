import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { StyledTableCell, StyledTableRow } from '../styles';
import dayjs from 'dayjs';
import { PackageDuration, PaymentHistory, PaymentStatus, UserType } from '@/graphql/generated';
import DeleteModal from './modal/delete-modal';
import DeleteIcon from '@/assets/delete-icon';
import EditIcon from '@/assets/edit-icon';
import { useRouter } from 'next/router';
import ModalContainer from '@/components/atoms/Modal';

interface Props {
	payment: PaymentHistory
}

const Body = ({ payment }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();


	// -------------------------------functions
	const editHandler = () => {
		if (payment?.owner?.userType === UserType?.BusinessMember) {
			router.push({
				pathname: '/admin/subscription/business-detail',
				query: {
					paymentId: Number(payment?.id),

				},
			});
		} else {
			router.push({
				pathname: '/admin/subscription/agancy-detail',
				query: {
					paymentId: Number(payment?.id),

				},
			});
		}

	};

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(payment?.owner?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(payment?.owner?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{payment?.owner?.userType === UserType?.BusinessMember ? 'Owner' : payment?.owner?.userType === UserType?.AgencyMember ? 'Agency' : 'Admin'}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{stringSlicer(payment?.owner?.email, 25)}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{payment?.packageDuration === PackageDuration?.OneMonth ? 'One Month'
						: payment?.packageDuration === PackageDuration?.ThreeMonth ? 'Three Month'
							: payment?.packageDuration === PackageDuration?.SixMonth ? 'Six Month'
								: payment?.packageDuration === PackageDuration?.Year ? 'One Year'
									: payment?.packageDuration === PackageDuration?.LifeTime ? 'Life Time'
										: null}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>${payment?.totalPrice}</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(payment?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>
			{/* <StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(payment?.expireDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell> */}

			<StyledTableCell align="left">
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					borderRadius={4}
					bgcolor={payment?.paymentStatus === PaymentStatus?.Paid ? theme?.palette?.infuuse?.green300 : payment?.paymentStatus === PaymentStatus?.Failed ? theme?.palette?.infuuse?.red300 : theme?.palette?.infuuse?.orange200}
					p={'4px 8px'}
					color={theme?.palette?.common?.white}
					fontWeight={'bold'}
				>
					{payment?.paymentStatus === PaymentStatus?.Paid
						? 'Paid' : payment?.paymentStatus === PaymentStatus?.Failed
							? 'Failed'
							: 'Pending'}
				</Box>
			</StyledTableCell>

			{payment?.paymentStatus === PaymentStatus?.Pending &&
				<StyledTableCell align="left">
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={3}>
						{/* ------------------------------options */}

						{/* <Box sx={{ cursor: 'pointer' }} onClick={editHandler}>
							<EditIcon fill={theme?.palette?.infuuse?.blue100} />
						</Box> */}

						<Box sx={{ cursor: 'pointer' }} onClick={handelModal}>
							<DeleteIcon />
						</Box>
					</Stack>
				</StyledTableCell>}

			{/* ------------------------------- modals */}
			{/* delete tag */}
			<ModalContainer open={open} handleClose={handleClose}>
				<DeleteModal handleClose={handleClose} payment={payment} />
			</ModalContainer>
		</StyledTableRow>
	);
};

export default Body;
