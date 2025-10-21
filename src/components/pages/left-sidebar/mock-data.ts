// mocks/conversationMock.ts
import { AccountStatus, ConversationMember, TypeContactNetwork, TypeSocialNetwork } from '@/graphql/generated';
import dayjs from 'dayjs';

// Mock user
export const mockUserId = 1;

// Mock conversation data
export const mockConversations = [
  {
    id: 101,
    type: 'SocialNetworkChat',
    contact: {
      id: 201,
      fullName: 'John Doe',
      photoUrl: 'https://i.pravatar.cc/150?img=3',
    },
    business: {
      id: 301,
      status: AccountStatus.Active,
      logo: 'https://via.placeholder.com/32',
    },
    lastMessage: {
      id: 401,
      message: `<p>Hello, how are you?</p>`,
      createdDate: dayjs().subtract(1, 'day').toISOString(),
      typeSocialNetwork: TypeSocialNetwork.LiveChat,
      conversationAttachments: [],
      conversationMember: {
        id: 501,
        userId: 2, // different from mockUserId to trigger unseen message
      } as ConversationMember,
    },
    conversationMembers: [
      { id: 501, userId: 1 } as ConversationMember,
      { id: 502, userId: 2 } as ConversationMember,
    ],
  },
  {
    id: 102,
    type: 'SocialNetworkChat',
    contact: {
      id: 202,
      fullName: 'Jane Smith',
      photoUrl: 'https://i.pravatar.cc/150?img=5',
    },
    business: {
      id: 302,
      status: AccountStatus.Suspended,
      logo: 'https://via.placeholder.com/32',
    },
    lastMessage: {
      id: 402,
      message: 'Please check the attachment',
      createdDate: dayjs().subtract(2, 'days').toISOString(),
      typeSocialNetwork: TypeSocialNetwork.Email,
      conversationAttachments: [{ id: 601, url: 'https://via.placeholder.com/100' }],
      conversationMember: {
        id: 503,
        userId: 2,
      } as ConversationMember,
    },
    conversationMembers: [
      { id: 503, userId: 1 } as ConversationMember,
      { id: 504, userId: 2 } as ConversationMember,
    ],
  },
];

// Mock network emails
export const mockNetworkEmails = [
  { id: 701, value: 'john@example.com', typeContactNetwork: TypeContactNetwork.Email },
  { id: 702, value: 'jane@example.com', typeContactNetwork: TypeContactNetwork.Email },
];
