import Avatar from '@/components/atoms/avatar';
import { getFullImageUrl } from '@/utils';
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { SupportProps } from '@/components/molecules/header/main-header/type';
import SupportMessageAttachment from './attachment';
import SupportMessage from './message';
import SupportMessageFooter from './footer';



const SendMessageSupport = ({ message, userId }: Partial<SupportProps>) => {

	const [openImage, setOpenIamage] = useState(false);

	return (
		<Stack direction={'row'} justifyContent={Number(message?.conversationMember?.user?.id) === Number(userId) ? 'start' : 'end'} alignItems={'center'} px={2} mb={'50px'}>
			{Number(message?.conversationMember?.user?.id) === Number(userId)
				? <Avatar src={getFullImageUrl(message?.conversationMember?.user?.photoUrl)} />
				: null}

			<Stack height={'100%'} position={'relative'} ml={Number(message?.conversationMember?.user?.id) === Number(userId) ? 1 : 0}>
				{(message?.conversationAttachments?.length ?? 0) >= 1 ? (
					<>
						{message?.conversationAttachments?.map((attachment) => (
							<SupportMessageAttachment
								attachment={attachment}
								userId={userId}
								message={message}
								setOpenIamage={setOpenIamage}
								openImage={openImage} />
						))}
					</>
				) : (
					<SupportMessage message={message} userId={userId} />
				)}
				{Number(message?.conversationMember?.user?.id) === Number(userId)
					? <SupportMessageFooter message={message} />
					: null}
			</Stack>
		</Stack >
	);
};

export default SendMessageSupport;
