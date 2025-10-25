import Image from '@/components/atoms/Image';
import { AttachmentType, ConversationMessage } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AudioPlayer from '../play-audio';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';
import { getAttachmentType } from '@/components/atoms/get-attachment-type';
import getFileType from '@/components/atoms/get-file-type';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
interface Props {
	message: ConversationMessage;
}

const SMSMessage = ({ message }: Props) => {
	const theme = useTheme();

	const [openImage, setOpenIamage] = useState(false);

	return (
		<>
			{message?.conversationAttachments?.length >= 1 ? (
				<>
					{message?.conversationAttachments?.map((attachment) => (
						<Stack key={attachment?.id}>
							{getAttachmentType(getFileType(attachment?.url as string)) === AttachmentType?.Image ? (
								<Stack borderRadius={2} p={1} boxShadow={2}>
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
											onClick={() => setOpenIamage(true)}
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

									<pre
										style={{
											lineBreak: 'anywhere',
											padding: '4px 12px',
											wordBreak: 'break-word',
											textJustify: 'inter-word',
											wordWrap: 'break-word',
											fontFamily: 'sans-serif',
											color: theme?.palette?.infuuse?.blueDark,
											marginTop: '16px',
										}}
									>{message?.message}</pre>

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
											<DownloadRoundedIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
										</a>
									</Stack>
								</Stack>
							) : getAttachmentType(getFileType(attachment?.url as string)) === AttachmentType?.Video ? (
								<Stack borderRadius={2} p={1} boxShadow={2}>
									<video
										src={getFullImageUrl(attachment?.url)}
										controls
										style={{
											width: '250px',
											height: 'auto',
										}}
									/>

									<pre
										style={{
											lineBreak: 'anywhere',
											padding: '4px 12px',
											wordBreak: 'break-word',
											textJustify: 'inter-word',
											wordWrap: 'break-word',
											fontFamily: 'sans-serif',
											color: theme?.palette?.infuuse?.blueDark,
											marginTop: '16px',
										}}
									>{message?.message}</pre>

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
											<DownloadRoundedIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
										</a>
									</Stack>
								</Stack>
							) : getAttachmentType(getFileType(attachment?.url as string)) === AttachmentType?.File ? (
								<Box borderRadius={2} p={2} boxShadow={2}>
									<Box
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
										height={'50px'}
									>
										<InsertDriveFileIcon
											sx={{
												fontSize: '48px',
												color: theme?.palette?.infuuse?.blue100,
											}}
										/>
									</Box>
									<pre
										style={{
											lineBreak: 'anywhere',
											padding: '4px 12px',
											wordBreak: 'break-word',
											textJustify: 'inter-word',
											wordWrap: 'break-word',
											fontFamily: 'sans-serif',
											color: theme?.palette?.infuuse?.blueDark,
											marginTop: '16px',
										}}
									>{message?.message}</pre>

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
											<DownloadRoundedIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
										</a>
									</Stack>
								</Box>
							) : getAttachmentType(getFileType(attachment?.url as string)) === AttachmentType?.Voice ? (
								<Stack borderRadius={2} p={1} boxShadow={2} position={'relative'}>
									<AudioPlayer audioFile={attachment?.url as string} />{' '}
									<pre
										style={{
											lineBreak: 'anywhere',
											padding: '4px 12px',
											wordBreak: 'break-word',
											textJustify: 'inter-word',
											wordWrap: 'break-word',
											fontFamily: 'sans-serif',
											color: theme?.palette?.infuuse?.blueDark,
											marginTop: '16px',
										}}
									>{message?.message}</pre>
								</Stack>
							) : (
								<LoadingProgress />
							)}
						</Stack>
					))}
				</>
			) : (
				<Box borderRadius={2} bgcolor={theme?.palette?.common?.white} p={2} boxShadow={2}>
					<pre
						style={{
							lineBreak: 'anywhere',
							padding: '4px 12px',
							wordBreak: 'break-word',
							textJustify: 'inter-word',
							wordWrap: 'break-word',
							fontFamily: 'sans-serif',
							color: theme?.palette?.infuuse?.blueDark,
							marginTop: '16px',
						}}
					>{message?.message}</pre>
				</Box>
			)}
		</>
	);
};

export default SMSMessage;
