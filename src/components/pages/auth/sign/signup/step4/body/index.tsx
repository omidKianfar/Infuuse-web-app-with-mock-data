import { Box, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Cart, CartBody } from '../styles';
import TwilioIcon from '@/assets/twilio-icon';
import GmailIcon from '@/assets/gmail-icon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NextButton } from '@/components/atoms/Button';
import { useRouter } from 'next/router';
import { useBusiness_GetByBusinessIdQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import Image from '@/components/atoms/Image';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SigninWithGoogleSocialChannel from '@/components/pages/settings/social-channels/body/signin-with-google';
import ModalContainer from '@/components/atoms/Modal';
import AddCallBusinessNumberModal from '@/components/pages/settings/social-channels/body/modal';
import { useAuth } from '@/providers/Auth/without-graphql/auth-provider-without-graphql';

type ChannelType = 'phone' | 'whatsapp' | 'meta' | 'gmail' | null;

const ChannelCard = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Cart
      direction="row"
      justifyContent="start"
      alignItems="center"
      onClick={onClick}
      bgcolor={selected ? theme.palette.infuuse.green400 : 'none'}
      sx={{ cursor: 'pointer', mb: 1 }}
    >
      <CartBody bgcolor={theme.palette.infuuse.gray200}>{icon}</CartBody>
      <Typography
        fontSize={16}
        color={selected ? theme.palette.common.white : theme.palette.infuuse.blueLight300}
        ml={1}
      >
        {label}
      </Typography>
    </Cart>
  );
};

const Body = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { setSignupStepCounter } = useAuth();

  const { data: User } = useUser_GetCurrentUserQuery();
  const CurrentUser = User?.user_getCurrentUser?.result;

  const { data: CurrentBusiness } = useBusiness_GetByBusinessIdQuery({
    businessId: Number(CurrentUser?.businessAccesses?.[0]?.business?.id),
  });

  const businessNumber = CurrentBusiness?.business_getByBusinessId?.result?.twilioPhoneNumber?.phoneNumber;

  const [selectedChannel, setSelectedChannel] = useState<ChannelType>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleFinish = () => {
    router.push('/inbox');
    setSignupStepCounter(0);
  };

  const handleSelectChannel = (channel: ChannelType) => {
    setSelectedChannel(channel);
    if (channel === 'phone') handleOpenModal();
  };

  return (
    <Stack pl={isMobile ? 0 : '100px'} pb={isMobile ? '80px' : 0}>
      <ChannelCard
        icon={<TwilioIcon />}
        label={businessNumber ?? 'Phone/SMS/Video Call'}
        selected={selectedChannel === 'phone'}
        onClick={() => handleSelectChannel('phone')}
      />

      <ChannelCard
        icon={<WhatsAppIcon sx={{ fill: theme.palette.infuuse.green300, fontSize: 32 }} />}
        label="WhatsApp"
        selected={selectedChannel === 'whatsapp'}
        onClick={() => handleSelectChannel('whatsapp')}
      />

      <ChannelCard
        icon={<Image src="images/meta-icon.svg" style={{ width: 32, height: 32 }} />}
        label="Meta"
        selected={selectedChannel === 'meta'}
        onClick={() => handleSelectChannel('meta')}
      />

      <ChannelCard
        icon={
          <GmailIcon
            fill={{
              fill1: '#EA4335',
              fill2: '#FBBC05',
              fill3: '#34A853',
              fill4: '#C5221F',
              fill5: '#4285F4',
            }}
          />
        }
        label="Gmail"
        selected={selectedChannel === 'gmail'}
        onClick={() => handleSelectChannel('gmail')}
      />

      {/* Conditional Renderings */}
      {selectedChannel === 'gmail' && (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <SigninWithGoogleSocialChannel />
        </GoogleOAuthProvider>
      )}

      {selectedChannel === 'meta' && (
        <Stack width="100%" direction="row" justifyContent="end" alignItems="center" mb={1}>
          <Tooltip title="Meta not available yet">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={theme.palette.infuuse.blue500}
              borderRadius={3}
              boxShadow={2}
              width={275}
              height={48}
            >
              <Image src="images/meta-icon.svg" style={{ width: 32, height: 32 }} />
              <Typography ml={1} color={theme.palette.common.white} fontWeight="bold">
                Sign in with Meta
              </Typography>
            </Box>
          </Tooltip>
        </Stack>
      )}

      <ModalContainer open={openModal} handleClose={handleCloseModal}>
        <AddCallBusinessNumberModal
          handleClose={handleCloseModal}
          businessId={CurrentUser?.businessAccesses?.[0]?.business?.id}
        />
      </ModalContainer>

      {/* Sticky Finish button for mobile */}
      {isMobile && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          width="100%"
          bgcolor={theme.palette.background.default}
          p={2}
          boxShadow="0 -2px 8px rgba(0,0,0,0.1)"
          zIndex={1000}
        >
          <Stack width="100%" direction="row" justifyContent="end">
            <NextButton onClick={handleFinish} sx={{ width: 278, fontSize: 16, fontWeight: 600 }}>
              Finish
            </NextButton>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default Body;
