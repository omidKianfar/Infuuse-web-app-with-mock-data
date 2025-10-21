import { Stack, Typography } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import dayjs from 'dayjs';
import OnlineBox from '../online-box/online-box';
import { User } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { StyledTableCell, StyledTableRow } from '../styles';

interface Props {
	member: User;
}

const BusinessMembersTeamBody = ({ member }: Props) => {
	return (
		<StyledTableRow onClick={(e) => e.stopPropagation()}>
			<StyledTableCell align="left">
				<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
					<Avatar src={getFullImageUrl(member?.photoUrl)} width={'42px'} height={'42px'} />

					<Typography fontSize={'14px'} ml={1}>
						{stringSlicer(member?.fullName, 25)}
					</Typography>
				</Stack>
			</StyledTableCell>

			<StyledTableCell align="left">
				<OnlineBox online={member?.isOnline} lineStatus={member?.lineStatus} />
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{member?.lastModifiedDate ? dayjs(member?.lastModifiedDate).format('hh:mm A') : 'Pendding'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{member?.business?.name ? stringSlicer(member?.business?.name, 25) : 'No Team'}
				</Typography>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(member?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default BusinessMembersTeamBody;
