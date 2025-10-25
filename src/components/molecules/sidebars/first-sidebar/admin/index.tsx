import React, { useContext, useEffect } from 'react';
import IconComponent from '../icon-component';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ReportIcon from '@/assets/report-icon';
import InboxIcon from '@/assets/inbox-icon';
import PhoneIcon from '@/assets/phone-icon';
import SmsIcon from '@/assets/sms-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import VideoCallIcon from '@/assets/video-call-icon';
import FacebookIcon from '@/assets/facebook-icon';
import GmailIcon from '@/assets/gmail-icon';
import { TypeSocialNetwork, useConversation_GetUnseenMessagesByTypeQuery, UserDto, UserType } from '@/graphql/generated';
import { queryClient } from 'pages/_app';
import { SubscriptionLayoutContext } from '@/providers/socialMessageProvider';

interface Props {
  CurrentUser: UserDto;
}

const AdminSidebar = ({ CurrentUser }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const { lastMessageSubscription } = useContext(SubscriptionLayoutContext);

  const variables = { take: 10000, skip: 0 };

  const { data: UnSeenConversationsMessages } = useConversation_GetUnseenMessagesByTypeQuery(variables);
  const UnSeenConversationsMessagesData = UnSeenConversationsMessages?.conversation_getUnseenMessagesByType?.result;

  useEffect(() => {
    if (lastMessageSubscription) refetchQueries();
  }, [lastMessageSubscription]);

  const refetchQueries = async () => {
    await queryClient.invalidateQueries(['conversation_getList']);
    await queryClient.invalidateQueries(['conversationMessage_getByConversationId']);
    await queryClient.invalidateQueries(['conversation_getUnseenMessagesByType']);
  };

  const getUnseen = (types: TypeSocialNetwork[]) => {
    return UnSeenConversationsMessagesData?.items
      ?.filter(item => types.includes(item?.typeSocialNetwork))
      ?.reduce((sum, item) => sum + (item?.countUnseenMessages || 0), 0) || 0;
  };

  const unSeenInboxMessage = getUnseen([
    TypeSocialNetwork.Facebook,
    TypeSocialNetwork.WhatsApp,
    TypeSocialNetwork.Instagram,
    TypeSocialNetwork.Email,
    TypeSocialNetwork.Sms,
    TypeSocialNetwork.Mms,
    TypeSocialNetwork.TwilioVoiceCall
  ]);

  const unSeenCallMessage = getUnseen([TypeSocialNetwork.TwilioVoiceCall]);
  const unSeenFacbookMessage = getUnseen([TypeSocialNetwork.Facebook]);
  const unSeenInstagramMessage = getUnseen([TypeSocialNetwork.Instagram]);
  const unSeenWhatsappMessage = getUnseen([TypeSocialNetwork.WhatsApp]);
  const unSeenGmailMessage = getUnseen([TypeSocialNetwork.Email]);
  const unSeenSMSMessage = getUnseen([TypeSocialNetwork.Sms, TypeSocialNetwork.Mms]);
  const unSeenLiveChatMessage = getUnseen([TypeSocialNetwork.LiveChat]);

  const inboxRelatedPaths = ['/gmail', '/facebook', '/whatsapp', '/instagram', '/call', '/message', '/live-chat'];

  const iconItems = [
    {
      path: '/reports',
      label: 'Reports',
      icon: <ReportIcon />, 
      show: CurrentUser?.isBusinessOwner ||
            CurrentUser?.user?.userType === UserType.AgencyMember ||
            (CurrentUser?.user?.userType === UserType.BusinessMember && CurrentUser?.businessAccesses?.[0]?.access?.isReportAccess),
      activePaths: ['/reports'],
      activeColor: theme.palette.infuuse.orange200
    },
    {
      path: '/inbox',
      label: 'Inbox',
      icon: <InboxIcon />, 
      unSeen: unSeenInboxMessage > 0 ? unSeenInboxMessage : undefined,
      activePaths: ['/inbox'],
      activeColor: theme.palette.infuuse.green400
    },
    {
      path: '/call',
      label: 'Call',
      icon: <PhoneIcon />, 
      unSeen: unSeenCallMessage > 0 ? unSeenCallMessage : undefined,
      activePaths: ['/call'],
      activeColor: theme.palette.infuuse.red100
    },
    {
      path: '/facebook',
      label: 'Facebook',
      icon: <FacebookIcon />, 
      unSeen: unSeenFacbookMessage > 0 ? unSeenFacbookMessage : undefined,
      activePaths: ['/facebook'],
      activeColor: theme.palette.infuuse.blueDark400
    },
    {
      path: '/instagram',
      label: 'Instagram',
      icon: <InstagramIcon />, 
      unSeen: unSeenInstagramMessage > 0 ? unSeenInstagramMessage : undefined,
      activePaths: ['/instagram'],
      activeColor: theme.palette.infuuse.porple200,
      isBox: true
    },
    {
      path: '/whatsapp',
      label: 'Whatsapp',
      icon: <WhatsAppIcon />, 
      unSeen: unSeenWhatsappMessage > 0 ? unSeenWhatsappMessage : undefined,
      activePaths: ['/whatsapp'],
      activeColor: theme.palette.infuuse.green300,
      isBox: true
    },
    {
      path: '/gmail',
      label: 'Gmail',
      icon: <GmailIcon />, 
      unSeen: unSeenGmailMessage > 0 ? unSeenGmailMessage : undefined,
      activePaths: ['/gmail'],
      multiColorFill: {
        fill1: '#EA4335',
        fill2: '#FBBC05',
        fill3: '#34A853',
        fill4: '#C5221F',
        fill5: '#4285F4'
      }
    },
    {
      path: '/message',
      label: 'Messages',
      icon: <SmsIcon />, 
      unSeen: unSeenSMSMessage > 0 ? unSeenSMSMessage : undefined,
      activePaths: ['/message'],
      activeColor: theme.palette.infuuse.porple200
    },
    {
      path: '/live-chat',
      label: 'Live Chat',
      icon: <LiveChatIcon />, 
      unSeen: unSeenLiveChatMessage > 0 ? unSeenLiveChatMessage : undefined,
      activePaths: ['/live-chat'],
      activeColor: theme.palette.infuuse.green300
    },
    {
      path: '/video-call/history',
      label: 'Video Call',
      icon: <VideoCallIcon />, 
      activePaths: ['/video-call/history'],
      activeColor: theme.palette.infuuse.red100
    }
  ];

  return (
    <>
      {iconItems.map(item => {
        if (item.show === false) return null;

        const isInboxActive = router.pathname === '/inbox' && inboxRelatedPaths.includes(item.path);
        const isActive = isInboxActive || item.activePaths?.some(p => router.pathname.includes(p)) || router.pathname.includes(item.path);

        const fillColor = item.multiColorFill
          ? (isActive ? item.multiColorFill : theme.palette.infuuse.gray500)
          : (isActive ? item.activeColor : theme.palette.infuuse.gray500);

        const iconElement = item.isBox
          ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: fillColor }}>{item.icon}</Box>
          : React.cloneElement(item.icon, { fill: fillColor });

        return (
          <IconComponent
            key={item.path}
            pathname={item.path}
            hover={item.label}
            unSeen={item.unSeen}
            active={isActive}
            icon={iconElement}
          />
        );
      })}
    </>
  );
};

export default AdminSidebar;