import Image from '@/components/atoms/Image';
import { AttachmentType, ConversationMessage } from '@/graphql/generated';
import { getFullImageUrl } from '@/utils';
import { Box, Button, IconButton, Menu, MenuItem, Modal, Stack, Typography, useTheme } from '@mui/material';
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
import MessageMenuIcon from '@/assets/message-menu-icon';
import Close from '@mui/icons-material/Close';
import ReplyIcon from '@/assets/reply-icon';
import { useSnapshot } from 'valtio';
import replyStore from '@/store/reply.store';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Link from 'next/link';
interface Props {
	message: ConversationMessage;
}

const GmailMessage = ({ message }: Props) => {
	// -------------------------------tools
	const theme = useTheme();

	// -------------------------------state management
	const { replyId } = useSnapshot(replyStore);

	const [openImage, setOpenIamage] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleReply = (id: number) => {
		replyStore.replyId = id;
		replyStore.replyMessage = stringSlicer(message.message, 150);
		setAnchorEl(null);
	};

	return (
		<Stack direction="row" gap="0.5rem">
			<Box
				borderRadius={2}
				bgcolor={theme?.palette?.common?.white}
				border={replyId === message.id ? `1px solid ${theme?.palette?.infuuse?.blueDark100}` : 'none'}
				p={2}
				boxShadow={2}
				maxWidth={375}
			>
				{message?.conversationAttachments && message?.conversationAttachments?.length >= 1 && (
					<Stack direction="row" flexWrap="wrap" justifyContent="space-between">
						{message?.conversationAttachments?.map(
							(attachment) =>
								attachment?.url && (
									<Stack key={attachment?.id}>
										{getAttachmentType(getFileType(attachment?.url as string)) ===
										AttachmentType?.Image ? (
											<Stack borderRadius={2} p={1} boxShadow={2} alignItems="center">
												<Box position={'relative'}>
													<Image
														src={getFullImageUrl(attachment?.url)}
														sx={{
															width: 150,
															height: 150,
														}}
													/>

													<Box
														position={'absolute'}
														bottom={'-4px'}
														right={0}
														sx={{ cursor: 'pointer' }}
														onClick={() => setOpenIamage(true)}
													>
														<CropFreeRoundedIcon
															sx={{ fill: theme?.palette?.common?.white }}
														/>
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

												<Stack
													direction={'row'}
													justifyContent={'center'}
													alignItems={'center'}
												>
													<a
														href={getFullImageUrl(attachment?.url)}
														download
														target="_blank"
														style={{
															marginTop: '8px',
															textDecoration: 'none',
															color: '#000',
															fontWeight: 'bold',
														}}
													>
														<DownloadRoundedIcon
															sx={{ fill: theme?.palette?.infuuse?.blue100 }}
														/>
													</a>
												</Stack>
											</Stack>
										) : getAttachmentType(getFileType(attachment?.url as string)) ===
										  AttachmentType?.Video ? (
											<Stack borderRadius={2} p={1} boxShadow={2} alignItems="center">
												<video
													src={getFullImageUrl(attachment?.url)}
													controls
													style={{
														width: 150,
														height: 150,
													}}
												/>

												<Stack
													direction={'row'}
													justifyContent={'center'}
													alignItems={'center'}
												>
													<a
														href={getFullImageUrl(attachment?.url)}
														download
														target="_blank"
														style={{
															marginTop: '8px',
															textDecoration: 'none',
															color: '#000',
															fontWeight: 'bold',
														}}
													>
														<DownloadRoundedIcon
															sx={{ fill: theme?.palette?.infuuse?.blue100 }}
														/>
													</a>
												</Stack>
											</Stack>
										) : getAttachmentType(getFileType(attachment?.url as string)) ===
										  AttachmentType?.File ? (
											<Box borderRadius={2} p={1} boxShadow={2} alignItems="center">
												<Box
													display={'flex'}
													justifyContent={'center'}
													alignItems={'center'}
													width={150}
													height={150}
												>
													<InsertDriveFileIcon
														sx={{
															fontSize: '48px',
															color: theme?.palette?.infuuse?.blue100,
														}}
													/>
												</Box>

												<Stack
													direction={'row'}
													justifyContent={'center'}
													alignItems={'center'}
												>
													<a
														href={getFullImageUrl(attachment?.url)}
														download
														target="_blank"
														style={{
															marginTop: '8px',
															textDecoration: 'none',
															color: '#000',
															fontWeight: 'bold',
														}}
													>
														<DownloadRoundedIcon
															sx={{ fill: theme?.palette?.infuuse?.blue100 }}
														/>
													</a>
												</Stack>
											</Box>
										) : getAttachmentType(getFileType(attachment?.url as string)) ===
										  AttachmentType?.Voice ? (
											<Stack borderRadius={2} p={1} boxShadow={2} position={'relative'}>
												<AudioPlayer audioFile={attachment?.url as string} />
											</Stack>
										) : (
											<LoadingProgress />
										)}
									</Stack>
								)
						)}
					</Stack>
				)}
				{message?.summaryReplyMessage && (
					<Stack
						p="0.5rem"
						gap="0.5rem"
						borderRadius="0.5rem"
						minWidth={300}
						sx={{
							cursor: 'pointer',
							bgcolor: (theme) => theme?.palette?.infuuse?.gray100,
							borderLeft: `8px solid ${theme?.palette?.infuuse?.orange200}`,
						}}
					>
						<Link
							href={`#${message.isReplyTo}`}
							ref={(node) => node && node.style.setProperty('text-decoration', 'none', 'important')}
						>
							<Typography sx={{ color: (theme) => theme.palette?.infuuse?.blueLight100 }}>
								{message.conversation?.conversationMembers?.[0]?.user?.email}
							</Typography>
							<Typography sx={{ color: (theme) => theme.palette?.infuuse?.blueLight300 }}>
								{message.subject}
							</Typography>
							<Typography
								style={{
									lineBreak: 'anywhere',
									padding: '4px 12px',
									wordBreak: 'break-word',
									textJustify: 'inter-word',
									wordWrap: 'break-word',
									fontFamily: 'sans-serif',
									color: theme?.palette?.infuuse?.blueLight200,
									marginTop: '16px',
								}}
								dangerouslySetInnerHTML={{ __html: message?.summaryReplyMessage }}
							/>
						</Link>
					</Stack>
				)}
				<Typography
					maxHeight={95}
					overflow="hidden"
					style={{
						lineBreak: 'anywhere',
						padding: '4px 12px',
						wordBreak: 'break-word',
						textJustify: 'inter-word',
						wordWrap: 'break-word',
						fontFamily: 'sans-serif',
						color: theme?.palette?.infuuse?.blueDark,
					}}
					dangerouslySetInnerHTML={{ __html: message?.message }}
				/>
				<Button variant="text" onClick={setShowModal.bind(null, true)}>
					Reed more
				</Button>
				<Modal open={showModal} onClose={setShowModal.bind(null, false)}>
					<Box
						sx={{
							top: '50%',
							left: '50%',
							padding: 3,
							borderRadius: 2,
							maxHeight: '90%',
							overflow: 'auto',
							position: 'absolute' as 'absolute',
							transform: 'translate(-50%, -50%)',
							boxShadow: '0px 2px 5px #00000048',
							backgroundColor: (theme) => theme.palette.background.paper,
						}}
					>
						<Typography
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
							dangerouslySetInnerHTML={{ __html: message?.message }}
						/>
					</Box>
				</Modal>
			</Box>
			{!Boolean(message?.conversationMemberId) && (
				<IconButton
					aria-label="more"
					id="long-button"
					aria-controls={open ? 'long-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup="true"
					onClick={handleClick}
					sx={{ height: 40 }}
				>
					{open ? <Close /> : <MessageMenuIcon />}
				</IconButton>
			)}
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				style={{ borderRadius: '50%' }}
			>
				<MenuItem onClick={handleReply.bind(null, message.id)}>
					<ReplyIcon />
				</MenuItem>
			</Menu>
		</Stack>
	);
};

export default GmailMessage;
