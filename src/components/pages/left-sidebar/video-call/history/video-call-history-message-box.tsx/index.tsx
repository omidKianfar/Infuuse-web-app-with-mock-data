import VideoCallIcon from '@/assets/video-call-icon';
import Avatar from '@/components/atoms/avatar';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import {
	AccountStatus,
	BusinessAccessDto,
	SortEnumType,
	useTwilio_GetHistoryVideosByBusinessIdQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';
import React from 'react';

interface Props {
	business?: BusinessAccessDto;
}

const VideoCallHistoryMessageBox = ({ business }: Props) => {
	// --------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// --------------------------------query
	const { data: twilioVideoHistory } = useTwilio_GetHistoryVideosByBusinessIdQuery({
		businessId: Number(business?.business?.id),
		skip: 0,
		take: 1,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const twilioVideoHistoryData = twilioVideoHistory?.twilio_getHistoryVideosByBusinessId?.result;

	// --------------------------------send chat page
	const routeChatDetail = async() => {
		if (
			business?.business?.status ===
			AccountStatus?.Active
		) {
			await router.push({
				pathname: '/video-call/history/chat',
				query: { businessId: business?.business?.id },
			});
			await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
		}
	};

	return (
		<Stack
			width={'100%'}
			height={'100%'}
			borderRadius={2}
			p={'8px 16px'}
			mb={2}
			bgcolor={theme?.palette?.infuuse?.gray100}
			sx={{ cursor: 'pointer' }}
			onClick={routeChatDetail}
			position={'relative'}
		>
			<Stack direction={'row'} justifyContent={'start'} alignItems={'start'}>
				{(business?.business?.status ===
					AccountStatus?.Suspended ||
					business?.business?.status ===
					AccountStatus?.AwaitingSubscriptionPayment) && (
						<Stack
							position={'absolute'}
							top={0}
							left={0}
							justifyContent={'center'}
							alignItems={'center'}
							zIndex={500}
							width={'100%'}
							height={'100%'}
						>
							<Box p={'8px 16px'} borderRadius={2} bgcolor={theme?.palette?.infuuse?.red300}>
								<Typography fontSize={'16px'} fontWeight={'bold'} color={theme?.palette?.common?.white}>
									Business Deactived
								</Typography>
							</Box>
						</Stack>
					)}

				<Stack mr={1} position={'relative'}>
					<Avatar
						src={getFullImageUrl(twilioVideoHistoryData?.items[0]?.creatorUser?.photoUrl)}
						width={'60px'}
						height={'60px'}
					/>
				</Stack>

				<Stack overflow={'hidden'}>
					<Typography mb={1} fontWeight={'bold'}>
						{stringSlicer(twilioVideoHistoryData?.items[0]?.creatorUser?.fullName)}
					</Typography>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'} mb={2}>
						<Box>
							<VideoCallIcon width="32px" height="32px" fill={theme?.palette?.infuuse.orange200} />
						</Box>
						<Typography
							sx={{
								lineBreak: 'anywhere',
								wordBreak: 'break-word',
								textJustify: 'inter-word',
								wordWrap: 'break-word',
								ml: 1,
								maxHeight: '40px',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
							dangerouslySetInnerHTML={{
								__html: twilioVideoHistoryData?.items[0]?.conversationMessage?.message,
							}}
						></Typography>
					</Stack>

					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Box mr={'46px'}>
							<Avatar
								src={getFullImageUrl(
									business?.business?.logo
								)}
								width={'32px'}
								height={'32px'}
							/>
						</Box>
						<Typography>
							{dayjs(twilioVideoHistoryData?.items[0]?.createdDate).format('MM/DD/YYYY')}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default VideoCallHistoryMessageBox;
