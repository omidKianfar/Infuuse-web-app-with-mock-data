import { AttachmentType, ConversationMessageCollectionSegment, ConversationType, TypeSocialNetwork, UserDto } from '@/graphql/generated';

export interface Props {
  conversationData?:  {
    __typename?: "ConversationMessageCollectionSegment" | undefined;
    totalCount: number;
    items?: ({
        __typename?: "ConversationMessage" | undefined;
        id: any;
        metaData?: string | null | undefined;
        createdDate: any;
        isAttachment: boolean;
        conversationMemberId?: number | null | undefined;
        isSentByContact: boolean;
        message?: string | null | undefined;
        isReplyTo?: any;
        subject?: string | null | undefined;
        summaryReplyMessage?: string | null | undefined;
        typeSocialNetwork: TypeSocialNetwork;
        conversationMember?: {
            __typename?: "ConversationMember";
            userId: number;
            user?: {
                __typename?: "User";
                id: number;
                fullName?: string | null;
                email?: string | null;
                photoUrl?: string | null;
            } | null;
        } | null;
        conversationAttachments?: Array<{
            __typename?: "ConversationAttachment";
            createdDate: any;
            id: number;
            type: AttachmentType;
            url?: string | null;
        } | null> | null;
        conversation?: {
            __typename?: "Conversation";
            title?: string | null;
            id: number;
            createdDate: any;
            type: ConversationType;
            contact?: {
                __typename?: "Contact";
                id: number;
                firstName?: string | null;
                photoUrl?: string | null;
                fullName?: string | null;
            } | null;
            conversationMembers?: Array<{
                __typename?: "ConversationMember";
                userId: number;
                user?: {
                    __typename?: "User";
                    id: number;
                    fullName?: string | null;
                    phoneNumber?: string | null;
                    photoUrl?: string | null;
                    email?: string | null;
                } | null;
            } | null> | null;
        } | null;
    } | null)[] | null | undefined;
} | null | undefined
  contactId?: string | string[];
  handleClose: () => void;
  handelModal: (num: number) => void;
}


export interface DefaultValuesType {
	note: string;
}
