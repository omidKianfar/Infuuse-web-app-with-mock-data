import AudioPlayer from '@/components/atoms/chat-box/conversation/send-message/message/play-audio';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';
import { AttachmentType, } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Lightbox from 'yet-another-react-lightbox';
import Image from '@/components/atoms/Image';
import 'yet-another-react-lightbox/styles.css';
import { SupportAttachmentProps, SupportProps } from '@/components/molecules/header/main-header/type';

const SupportMessageAttachment = ({ attachment, userId, message, setOpenIamage, openImage }: Partial<SupportProps & SupportAttachmentProps>) => {
    const theme = useTheme();

    return (
        <Stack key={attachment?.id}>
            {attachment?.type === AttachmentType?.Image ? (
                <Stack borderRadius={2} p={1} boxShadow={2} bgcolor={Number(message?.conversationMember?.user?.id) !== Number(userId) ? `rgba(255,188,1,0.8)` : theme?.palette?.common?.white}>
                    <Box position={'relative'}>
                        <Image
                            src={getFullImageUrl(attachment?.url)}
                            sx={{
                                width: '250px',
                                height: 'auto',
                            }}
                        />
                        <Box
                            position={'absolute'}
                            bottom={'-4px'}
                            right={0}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setOpenIamage?.(true)}
                        >
                            <CropFreeRoundedIcon sx={{ fill: theme?.palette?.common?.white }} />
                        </Box>
                    </Box>

                    <Lightbox
                        open={openImage}
                        close={() => setOpenIamage(false)}
                        slides={[{ src: `${getFullImageUrl(attachment?.url)}` }]}
                        carousel={{
                            imageFit: 'contain',
                        }}
                        plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
                        styles={{
                            navigationNext: {
                                display: 'none',
                            },
                            navigationPrev: {
                                display: 'none',
                            },
                        }}
                    />
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <a
                            href={getFullImageUrl(attachment?.url)}
                            download
                            style={{
                                marginTop: '8px',
                                textDecoration: 'none',
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                        >
                            <DownloadRoundedIcon sx={{ fill: Number(message?.conversationMember?.user?.id) !== Number(userId) ? theme?.palette?.infuuse?.green300 : theme?.palette?.infuuse?.blue100 }} />
                        </a>
                    </Stack>
                </Stack>
            ) : attachment?.type === AttachmentType?.Video ? (
                <Stack borderRadius={2} p={1} boxShadow={2} bgcolor={Number(message?.conversationMember?.user?.id) !== Number(userId) ? `rgba(255,188,1,0.8)` : theme?.palette?.common?.white}>
                    <Stack>
                        <video
                            src={getFullImageUrl(attachment?.url)}
                            controls
                            style={{
                                width: '250px',
                                height: 'auto',
                            }}
                        />
                    </Stack>

                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <a
                            href={getFullImageUrl(attachment?.url)}
                            download
                            style={{
                                marginTop: '8px',
                                textDecoration: 'none',
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                        >
                            <DownloadRoundedIcon sx={{ fill: Number(message?.conversationMember?.user?.id) !== Number(userId) ? theme?.palette?.infuuse?.green300 : theme?.palette?.infuuse?.blue100 }} />
                        </a>
                    </Stack>
                </Stack>
            ) : attachment?.type === AttachmentType?.File ? (
                <Box borderRadius={2} p={2} boxShadow={2} bgcolor={Number(message?.conversationMember?.user?.id) !== Number(userId) ? `rgba(255,188,1,0.8)` : theme?.palette?.common?.white}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        height={'50px'}
                    >
                        <InsertDriveFileIcon
                            sx={{
                                fontSize: '48px',
                                color: Number(message?.conversationMember?.user?.id) !== Number(userId) ? theme?.palette?.infuuse?.gray200 : theme?.palette?.infuuse?.blue100,
                            }}
                        />
                    </Box>

                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <a
                            href={getFullImageUrl(attachment?.url)}
                            download
                            style={{
                                marginTop: '8px',
                                textDecoration: 'none',
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                        >
                            <DownloadRoundedIcon sx={{ fill: Number(message?.conversationMember?.user?.id) !== Number(userId) ? theme?.palette?.infuuse?.green300 : theme?.palette?.infuuse?.blue100 }} />
                        </a>
                    </Stack>
                </Box>
            ) : attachment?.type === AttachmentType?.Voice ? (
                <Stack borderRadius={2} p={1} boxShadow={2} position={'relative'} bgcolor={Number(message?.conversationMember?.user?.id) !== Number(userId) ? `rgba(255,188,1,0.8)` : theme?.palette?.common?.white}>
                    <AudioPlayer audioFile={attachment?.url as string} />{' '}
                </Stack>
            ) : (
                <LoadingProgress />
            )}
        </Stack>
    )
}

export default SupportMessageAttachment
