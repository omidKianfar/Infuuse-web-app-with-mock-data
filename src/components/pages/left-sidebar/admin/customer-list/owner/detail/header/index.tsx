import { Box, Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useRouter } from 'next/router';
import SubscriptionIcon from '@/assets/subscription-icon';
import BusinessIcon from '@/assets/business-icon';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import { AccountStatus, BusinessAdminDetailsDto, PaymentType, SortEnumType, usePaymentHistory_GetListQuery } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import ModalContainer from '@/components/atoms/Modal';
import ActiveModal from './modal/active-modal';

interface Props {
	businessDetailData: BusinessAdminDetailsDto;
}

const Header = ({ businessDetailData }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const { data: PaymentHistory } = usePaymentHistory_GetListQuery({
		skip: 0,
		take: 1,
		where: {
			ownerId: {
				eq: Number(businessDetailData?.businessOwner?.id)
			}
		},
		order: {
			createdDate: SortEnumType?.Desc
		}
	})

	const PaymentHistoryData = PaymentHistory?.paymentHistory_getList?.result

	const handelRouter = () => {
		router?.push({
			pathname: '/admin/customer-list/owner-detail/subscription',
			query: {
				ownerId: businessDetailData?.businessOwner?.id,
				businessId: businessDetailData?.business?.id
			}
		})
	}

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};


	return (
		<Stack mb={2} bgcolor={theme?.palette?.infuuse?.blue100} borderRadius={2} width={'100%'} height={'100%'} p={2}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={'4px'}>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => router?.back()}
						display={'flex'}
						justifyContent={'start'}
						alignItems={'center'}
					>
						<ArrowBackIosRoundedIcon sx={{ fill: theme?.palette?.infuuse?.gray100 }} />
					</Box>

					<Typography fontWeight={'bold'} color={theme?.palette?.infuuse?.gray100}>
						Customer List
					</Typography>
				</Stack>

				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1}>
					<CustomBox
						bgcolor={theme?.palette?.common?.white}
						width={'150px'}
						height={'40px'}
						sx={{
							cursor: 'pointer',
							'&:hover': {
								bgcolor: theme?.palette?.infuuse?.gray200,
							},
						}}
						onClick={handelRouter}
					>
						<Box display={'flex'} justifyContent={'center'} alignItems={'center'} >
							<SubscriptionIcon fill={theme?.palette?.infuuse?.blue100} />
						</Box>

						<Typography ml={'4px'} color={theme?.palette?.infuuse?.blue100}>
							Subscription
						</Typography>
					</CustomBox>

					<CustomBox
						bgcolor={theme?.palette?.common?.white}
						width={'150px'}
						height={'40px'}
						onClick={handelModal}
						sx={{
							cursor: 'pointer',
							'&:hover': {
								bgcolor: theme?.palette?.infuuse?.gray200,
							},
						}}
					>
						<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<BusinessIcon
								fill={
									businessDetailData?.business?.status === AccountStatus?.Active
										? theme?.palette?.infuuse?.green300
										: theme?.palette?.infuuse?.orange200
								}
							/>
						</Box>
						<Typography
							pt={'2px'}
							ml={'4px'}
							color={
								businessDetailData?.business?.status === AccountStatus?.Active
									? theme?.palette?.infuuse?.green300
									: theme?.palette?.infuuse?.orange200
							}
						>
							{businessDetailData?.business?.status === AccountStatus?.Active ? 'Active' : 'Deactive'}
						</Typography>
					</CustomBox>
				</Stack>
			</Stack>

			<Divider sx={{ my: 2, borderColor: theme?.palette?.infuuse?.gray400 }} />

			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(businessDetailData?.business?.logo)} width={'80px'} height={'80px'} />
					<Stack ml={2}>
						<Stack width={'100%'} mb={1}>
							<Typography color={theme?.palette?.common?.white} fontWeight={'bold'} fontSize={'18px'}>
								{businessDetailData?.business?.name}
							</Typography>
						</Stack>

						<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1}>
							<CustomBox bgcolor={theme?.palette?.infuuse?.blue500} p={'8px 16px'} boxShadow={2}>
								<Typography color={theme?.palette?.common?.white}>
									{businessDetailData?.business?.businessMembers?.length} Users
								</Typography>
							</CustomBox>

							<CustomBox bgcolor={theme?.palette?.infuuse?.blue500} p={'8px 16px'} boxShadow={2}>
								<Typography color={theme?.palette?.common?.white}>
									{businessDetailData?.contactsCount} Contacts
								</Typography>
							</CustomBox>

							{PaymentHistoryData?.items[0]?.paymentType &&
								<CustomBox bgcolor={theme?.palette?.infuuse?.blue500} p={'8px 16px'} boxShadow={2}>
									<Typography color={theme?.palette?.common?.white}>
										Subscription Type: {PaymentHistoryData?.items[0]?.paymentType === PaymentType?.Intent ? 'Custom Package' : 'Subscription'}
									</Typography>
								</CustomBox>}
						</Stack>
					</Stack>
				</Stack>

				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					<Typography color={theme?.palette?.common?.white}>
						Created at: {dayjs(businessDetailData?.business?.createdDate).format('MM/DD/YYYY')}
					</Typography>
				</Stack>
			</Stack>
			{/* ------------------------------- modals */}
			{/* active member */}
			<ModalContainer open={open} handleClose={handleClose}>
				<ActiveModal handleClose={handleClose} business={businessDetailData} />
			</ModalContainer>
		</Stack>
	);
};

export default Header;

export const CustomBox = styled(Box)(({ theme }) => ({
	borderRadius: '16px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));
