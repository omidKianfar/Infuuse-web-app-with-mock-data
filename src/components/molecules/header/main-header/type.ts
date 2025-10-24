import {
	ConversationCollectionSegment,
	ConversationMessage,
	ConversationMessageCollectionSegment,
	Maybe,
	Notification,
	NotificationCollectionSegment,
} from '@/graphql/generated';

export interface HeaderProps {
	handelModal?: () => void;
	handleClose?: () => void;
	open?: boolean;
}

export interface SupportProps {
	refetchQueries?: () => Promise<void>;
	setMessagesUnSeenIds?: React.Dispatch<React.SetStateAction<number[]>>;
	supportHandler?: () => Promise<void>;
	SupportState?: boolean;
	userId?: number | undefined;
	SupportChatData: ConversationCollectionSegment;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	conversationLastMessageData: ConversationMessageCollectionSegment;
	message: Maybe<ConversationMessage>
}

export interface InternalChatProps {
	internalCHatHandler?: () => void;
	userId?: number | undefined;
}

export interface NotificationProps {
	notificationHandler: () => void;
	NotificationData: NotificationCollectionSegment;
	setNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
	NotificationConvert: any;
	notificationRead: (id: number) => void;
	notification: Notification;
	notificationsRead: () => void;
}
export interface TicketProps {
	selectTicket: (ticketId: number) => Promise<void>;
}

export interface SupportRateProps {
    Score: number,
    Name: string
}

export interface SupportAttachmentProps {
    attachment:,  setOpenIamage:, openImage:
}