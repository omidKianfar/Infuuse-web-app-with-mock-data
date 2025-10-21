import React, { useState } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import {
	SortEnumType,
	useTwilio_GetHistoryVideosByBusinessIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import FilterList from '@/components/atoms/select-filter/business-filter-list';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import SendMessageCall from './send-message/send-message';

const VideoCallHistory_Chat = () => {
	const router = useRouter();
	const theme = useTheme();

	const businessId = router?.query?.businessId;

	const { data: twilioVideoHistory } = useTwilio_GetHistoryVideosByBusinessIdQuery({
		businessId: Number(businessId),
		skip: 0,
		take: 1000,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	return (
		<Stack px={2} width={'100%'} height={'100%'} maxHeight={'100vh'} overflow={'auto'} pb={'300px'} mt={1} p={2}>
			{twilioVideoHistory?.twilio_getHistoryVideosByBusinessId?.result?.items?.map((message) => {
				return (
					<Stack key={message?.id} mb={4}>
						<Stack justifyContent={'center'} alignItems={'center'} mb={2}>
							<Typography color={theme?.palette?.infuuse?.blue100}>
								Video call created by {message?.creatorUser?.fullName}{' '} at {' '}
								{dayjs(message?.createdDate).format('MM/DD/YYYY')}{' '}
								{dayjs(message?.createdDate).format('hh:mm A')}{' '}
							</Typography>
						</Stack>

						<SendMessageCall message={message} />
					</Stack>
				);
			})}
		</Stack>
	);
};

export default VideoCallHistory_Chat;
