import { Stack, Typography } from '@mui/material';
import React from 'react';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { StyledTableCell, StyledTableRow } from '../../../styles';
import dayjs from 'dayjs';
import { BusinessMember, BusinessTypeMember, Maybe } from '@/graphql/generated';

interface Props {
	member: Maybe<BusinessMember>;
}

const Body = ({ member }: Props) => {
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
				<Typography fontSize={'14px'}>{member?.email}</Typography>{' '}
			</StyledTableCell>
			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{member?.isActive ? 'Active' : 'Deactive'}</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>
					{member?.typeMember === BusinessTypeMember?.Owner ? 'Owner' : 'Member'}
				</Typography>{' '}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Typography fontSize={'14px'}>{dayjs(member?.createdDate).format('MM/DD/YYYY')}</Typography>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default Body;
