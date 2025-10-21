import {
	ContactNetwork,
	ConversationMessage,
	SortEnumType,
	TypeContactNetwork,
	useContactNetwork_GetListByContactIdQuery,
} from '@/graphql/generated';
import { useRouter } from 'next/router';
import FooterInbox from './footer/inbox-footer';
import LiveChatFooter from './footer/live-chat-footer';
import SMSFooter from './footer/sms-footer';
import GmailFooter from './footer/gmail-footer';
import InternalChatFooter from './footer/internal-chat-footer';
import AdminSupportFooter from './footer/admin-support-footer';

interface Props {
	lastMessageSubscription: ConversationMessage;
}

const Footer = ({ lastMessageSubscription }: Props) => {
	const router = useRouter();
	const ContactId = router?.query?.contactId;

	// contact networks
	const NetworkData = useContactNetwork_GetListByContactIdQuery({
		contactId: Number(ContactId),
		skip: 0,
		take: 1000,
		where: {
			typeContactNetwork: {
				eq: TypeContactNetwork?.Email,
			},
		},
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});

	const Networks = NetworkData?.data?.contactNetwork_getListByContactId?.result?.items;

	return (
		<>
			{router.pathname.includes('/inbox') ? (
				<FooterInbox lastMessageSubscription={lastMessageSubscription} />
			) : router?.pathname.includes('/live-chat') ? (
				<LiveChatFooter />
			) : router?.pathname.includes('/message') ? (
				<SMSFooter lastMessageSubscription={lastMessageSubscription} />
			) : router?.pathname.includes('/gmail') && Networks ? (
				<GmailFooter
					lastMessageSubscription={lastMessageSubscription}
					Networks={Networks as ContactNetwork[]}
				/>
			) : router?.pathname.includes('/internal-chat') ? (
				<InternalChatFooter />
			) : router?.pathname.includes('/admin/support') ? (
				<AdminSupportFooter />
			) : null}
		</>
	);
};

export default Footer;
