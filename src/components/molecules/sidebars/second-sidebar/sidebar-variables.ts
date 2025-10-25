// sidebarVariables.ts
import { ConversationType,  SortEnumType, TypeSocialNetwork } from '@/graphql/generated';

export const liveChatVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{ type: { eq: ConversationType.SocialNetworkChat } },
			{ conversationMessages: { some: { typeSocialNetwork: { eq: TypeSocialNetwork.LiveChat } } } },
		],
	},
	order: { lastModifiedDate: SortEnumType.Desc },
};

export const messageVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{ type: { eq: ConversationType.SocialNetworkChat } },
			{
				or: [
					{ conversationMessages: { some: { typeSocialNetwork: { eq: TypeSocialNetwork.Sms } } } },
					{ conversationMessages: { some: { typeSocialNetwork: { eq: TypeSocialNetwork.Mms } } } },
				],
			},
		],
	},
	order: { lastModifiedDate: SortEnumType.Desc },
};

export const whatsappVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{
				type: {
					eq: ConversationType?.SocialNetworkChat,
				},
			},
			{
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.WhatsApp,
						},
					},
				},
			},
		],
	},
	order: {
		lastModifiedDate: SortEnumType?.Desc,
	},
};

export const instagramVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{
				type: {
					eq: ConversationType?.SocialNetworkChat,
				},
			},

			{
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Instagram,
						},
					},
				},
			},
		],
	},
	order: {
		lastModifiedDate: SortEnumType?.Desc,
	},
};

export const facebookVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{
				type: {
					eq: ConversationType?.SocialNetworkChat,
				},
			},
			{
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Facebook,
						},
					},
				},
			},
		],
	},
	order: {
		lastMessage: {
			createdDate: SortEnumType?.Desc,
		},
	},
};

export const gmailVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{
				type: {
					eq: ConversationType?.SocialNetworkChat,
				},
			},
			{
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.Email,
						},
					},
				},
			},
		],
	},
	order: {
		lastMessage: {
			createdDate: SortEnumType?.Desc,
		},
	},
};

export const internalChatVariables = {
	skip: 0,
	take: 10000,
	where: {
		type: {
			eq: ConversationType?.InternalChat,
		},
	},
	order: {
		lastModifiedDate: SortEnumType?.Desc,
	},
};

export const callVariables = {
	skip: 0,
	take: 10000,
	where: {
		and: [
			{
				type: {
					eq: ConversationType?.SocialNetworkChat,
				},
			},
			{
				conversationMessages: {
					some: {
						typeSocialNetwork: {
							eq: TypeSocialNetwork?.TwilioVoiceCall,
						},
					},
				},
			},
		],
	},
	order: {
		lastMessage: {
			createdDate: SortEnumType?.Desc,
		},
	},
};

export const adminInternalChatVariables = {
	skip: 0,
	take: 10000,
	where: {
		type: {
			eq: ConversationType?.InternalChat,
		},
	},
	order: {
		lastMessage: {
			createdDate: SortEnumType?.Desc,
		},
	},
};

export const adminSupportChatVariables = {
	skip: 0,
	take: 10000,
	order: {
		lastMessage: {
			createdDate: SortEnumType?.Desc,
		},
	},
};

