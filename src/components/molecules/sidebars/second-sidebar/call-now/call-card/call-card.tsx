import TextMaxLine from '@/components/atoms/TextMaxLine';
import {
	ConversationMessage,
	useTwilio_AnswerCallByCallSidMutation,
	useTwilio_RejectCallByCallSidMutation,
	useTwilio_VoiceCallRequestMutation,
} from '@/graphql/generated';
import { useTwilio } from '@/providers/Twilio/provider';
import { getFullImageUrl } from '@/utils';
import { Avatar, CircularProgress, IconButton, Stack, useTheme } from '@mui/material';
import { Call, CallSlash } from 'iconsax-react';

type Props = {
	item: ConversationMessage;
};
export default function ({ item }: Props) {
	const theme = useTheme();
	const { activeConnection, twilioDevice } = useTwilio();

	const { mutateAsync: callRequestMutation, isLoading: callRequestLoading } = useTwilio_VoiceCallRequestMutation();
	const { mutateAsync: answerCallMutation, isLoading: answerCallLoading } = useTwilio_AnswerCallByCallSidMutation();
	const { mutateAsync: rejectCallMutation, isLoading: rejectCallLoading } = useTwilio_RejectCallByCallSidMutation();

	const onAnswerCall = async () => {
		await answerCallMutation({ callSid: item.twilioHistoryCall?.callSid });
	};

	const onRejectCall = async () => {
		await rejectCallMutation({ callSid: item.twilioHistoryCall?.callSid });
	};

	return (
		<Stack p={2} mb={2} borderRadius={2} bgcolor={theme.palette.infuuse.blueLight400}>
			<Stack flex={1} direction="row" alignItems="center">
				<Avatar
					width={60}
					height={60}
					sx={{ mr: 1 }}
					src={getFullImageUrl(item.conversation?.contact?.photoUrl)}
				/>
				<TextMaxLine line={1} fontSize={16} fontWeight="bold" color={theme?.palette?.common?.white}>
					{item.conversation?.contact?.fullName ?? item.twilioHistoryCall?.from}
				</TextMaxLine>
			</Stack>

			<Stack spacing={1} width="100%" direction="row" alignItems="center" justifyContent="flex-end">
				<IconButton color="success" onClick={onAnswerCall} disabled={answerCallLoading}>
					{answerCallLoading ? (
						<CircularProgress size={18} color="success" />
					) : (
						<Call size={18} variant="TwoTone" color={theme?.palette?.success.light} />
					)}
				</IconButton>
				<IconButton color="error" onClick={onRejectCall} disabled={rejectCallLoading}>
					{rejectCallLoading ? (
						<CircularProgress size={18} color="error" />
					) : (
						<CallSlash size={18} variant="TwoTone" color={theme?.palette?.error.light} />
					)}
				</IconButton>
			</Stack>
		</Stack>
	);
}
