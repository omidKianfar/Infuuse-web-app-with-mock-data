import { NextButton } from '@/components/atoms/Button';
import { BusinessMember, useBusinessMember_EditMutation } from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

interface Props {
	handleClose: () => void;
	member: BusinessMember;
}

const ActiveModal = ({ member, handleClose }: Props) => {
	// -------------------------------tools
	const theme = useTheme();
	const querClient = useQueryClient();

	// -------------------------------query
	// edit mutation
	const { mutate: UpdateUser } = useBusinessMember_EditMutation();

	// active
	const ActiveHandler = () => {
		UpdateUser(
			{
				input: {
					email: null,
					fullName: member?.fullName,
					isManageBusinessUserAccess: member?.isManageBusinessUserAccess,
					isSettingsManagmentAccess: member?.isSettingsManagmentAccess,
					isOpratorAccess: member?.isOpratorAccess,
					isSocialManagmentAccess: member?.isSocialManagmentAccess,
					isReportAccess: member?.isReportAccess,
					isActive: member?.isActive === true ? false : true,
				},
				businessMemberId: Number(member?.id),
			},
			{
				onSuccess: (data) => {
					const { status } = responseDestructure(data);
					if (status.code == 1) {
						enqueueSnackbar(status.description, { variant: 'success' });
						querClient.refetchQueries(['businessMember_getList']);
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
							color: member?.isActive
								? theme?.palette?.infuuse?.orange100
								: theme?.palette?.infuuse?.green200,
							marginLeft: '4px',
						}}
					>
						{member?.isActive ? 'deactive' : 'active'}
					</span>
					<span style={{ color: theme?.palette?.infuuse?.blue100, wordBreak: 'keep-all', margin: '0 4px' }}>
						{member?.fullName}
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
					{member?.isActive ? 'Deactive' : 'Active'}
				</NextButton>
			</Stack>
		</Stack>
	);
};

export default ActiveModal;
