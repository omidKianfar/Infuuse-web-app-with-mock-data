import { NextButton } from '@/components/atoms/Button';
import { AccountStatus, BusinessAdminDetailsDto, useBusiness_EditByAdminMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

interface Props {
	business: BusinessAdminDetailsDto;
	handleClose: () => void;
}

const ActiveModal = ({ handleClose, business }: Props) => {
	const theme = useTheme();
	const querClient = useQueryClient();

	const { mutate: UpdateBusiness } = useBusiness_EditByAdminMutation();

	const ActiveHandler = () => {
		UpdateBusiness(
			{
				input: {
					status:
						business?.business?.status === AccountStatus?.Suspended
							? AccountStatus?.Active
							: AccountStatus?.Suspended,
					twilioPhoneNumberId: null,
					name: business?.business?.name,
					logo: null,
					isHideAgency: null,
				},
				businessId: Number(business?.business?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						handleClose();
						querClient.invalidateQueries(['business_getDetailsByAdmin']);
					} else {
						enqueueSnackbar(status.description, { variant: 'error' });
					}
				},
			}
		);
	};

	return (
		<Stack width={'400px'} height={'100%'} bgcolor={theme?.palette?.infuuse?.gray200} p={'24px'} borderRadius={2}>
			<Stack sx={{ textAlign: 'center', mb: 4 }}>
				<Typography fontWeight={'bold'} sx={{ textJustify: 'inter-word' }}>
					Do you want{' '}
					<span
						style={{
							color:
								business?.business?.status === AccountStatus?.Active
									? theme?.palette?.infuuse?.green300
									: theme?.palette?.infuuse?.orange200,
							marginLeft: '4px',
						}}
					>
						{business?.business?.status === AccountStatus?.Active ? 'deactive' : 'active'}
					</span>
					<span style={{ color: theme?.palette?.infuuse?.blue100, wordBreak: 'keep-all', margin: '0 4px' }}>
						{business?.business?.name}
					</span>
					?
				</Typography>
			</Stack>

			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<NextButton
					onClick={handleClose}
					sx={{ width: '150px', backgroundColor: theme?.palette?.infuuse?.red300 }}
				>
					Cancel
				</NextButton>

				<NextButton onClick={ActiveHandler} sx={{ width: '150px' }}>
					{business?.business?.status === AccountStatus?.Active ? 'Deactivated' : 'Activated'}
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default ActiveModal;
