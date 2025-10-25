import React, { useContext, useEffect } from 'react';
import IconComponent from '../icon-component';
import { useRouter } from 'next/router';
import { Box, Stack, useTheme } from '@mui/material';
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

const UserSidebar = ({ CurrentUser }: Props) => {
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

  const menuItems = [
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
      unseen: unSeenInboxMessage,
      activePaths: ['/inbox'],
      activeColor: theme.palette.infuuse.green400
    },
    {
      path: '/call',
      label: 'Call',
      icon: <PhoneIcon />,
      unseen: unSeenCallMessage,
      activePaths: ['/call'],
      activeColor: theme.palette.infuuse.red100
    },
    {
      path: '/facebook',
      label: 'Facebook',
      icon: <FacebookIcon />,
      unseen: unSeenFacbookMessage,
      activePaths: ['/facebook'],
      activeColor: theme.palette.infuuse.blueDark400
    },
    {
      path: '/instagram',
      label: 'Instagram',
      icon: <InstagramIcon sx={{ width: '32px', height: '32px' }} />,
      unseen: unSeenInstagramMessage,
      activePaths: ['/instagram'],
      activeColor: theme.palette.infuuse.porple200,
      isBox: true
    },
    {
      path: '/whatsapp',
      label: 'Whatsapp',
      icon: <WhatsAppIcon sx={{ width: '32px', height: '32px' }} />,
      unseen: unSeenWhatsappMessage,
      activePaths: ['/whatsapp'],
      activeColor: theme.palette.infuuse.green300,
      isBox: true
    },
    {
      path: '/gmail',
      label: 'Gmail',
      icon: <GmailIcon />,
      unseen: unSeenGmailMessage,
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
      unseen: unSeenSMSMessage,
      activePaths: ['/message'],
      activeColor: theme.palette.infuuse.porple200
    },
    {
      path: '/live-chat',
      label: 'Live Chat',
      icon: <LiveChatIcon />,
      unseen: unSeenLiveChatMessage,
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
    <Stack>
      {menuItems.map(item => {
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
            unSeen={Number(item.unseen || 0) >= 1 ? Number(item.unseen) : undefined}
            hover={item.label}
            active={isActive}
            icon={iconElement}
          />
        );
      })}
    </Stack>
  );
};

export default UserSidebar;