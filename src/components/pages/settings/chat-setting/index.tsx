import { Box, Stack, styled, Switch, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FooterComment, Label, MemberContainer } from '../members/styles';
import LightIcon from '@/assets/light-icon';
import LiveChatIcon from '@/assets/live-chat-icon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { enqueueSnackbar } from 'notistack';
import iframeDocs from './iframe.docs';
import copy from 'clipboard-copy';
import { useBusiness_GetByBusinessIdQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import FilterList from '@/components/atoms/select-filter/business-filter-list';
import { useRouter } from 'next/router';

const ChatSetting = () => {
	// ------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// ------------------------------ state
	const [checked, setChecked] = React.useState(true);
	const [setBusinessId, businessId] = React.useState<number>(Number(CurrentUser?.businessAccesses[0]?.business?.id));

	// -------------------------------query
	const { data: business } = useBusiness_GetByBusinessIdQuery({
		businessId: Number(setBusinessId),
	});

	// ------------------------------ functions
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const Link = `${location?.href}/contact-chat?key=${business?.business_getByBusinessId?.result?.businessKey}`;

	return (
		<Stack width={'100%'} height={'100%'} p={2}>
			<MemberContainer sx={{ height: '100vh' }}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
					<Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<Box mr={1}>
							<LiveChatIcon fill={theme?.palette?.infuuse?.green300} />
						</Box>

						<Typography>
							Live chat allows your customers to contact you through an iframe on your website
						</Typography>
					</Stack>
					<FilterList setBusinessId={setBusinessId} businessId={businessId} />
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<Stack>
						<CustomSwitch checked={checked} onChange={handleChange} />

						<Label>Iframe Code</Label>
					</Stack>

					{checked && (
						<Box
							sx={{ cursor: 'pointer' }}
							onClick={() => {
								copy(iframeDocs(Link));

								enqueueSnackbar('Copied', { variant: 'success' });
							}}
						>
							<ContentCopyIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
						</Box>
					)}
				</Stack>

				<Stack mb={4}>
					{checked && (
						<Stack>
							<Box
								border="1px solid #76B7F9"
								padding="10px"
								position="relative"
								borderRadius="12px"
								marginTop="7px"
								maxHeight="300px"
								overflow="auto"
							>
								<Typography
									fontSize="14px"
									color="#676372"
									component="pre"
									sx={{ whiteSpace: 'pre-wrap' }}
								>
									{iframeDocs(Link)}
								</Typography>
							</Box>

							<Typography fontSize="12px" color="#9C98A2" marginTop="5px">
								Embed this code in your website
							</Typography>
						</Stack>
					)}

					<Box marginTop="20px">
						<Box display="flex" alignItems="center" justifyContent="space-between">
							<Typography fontSize="16px" color="#415070">
								Direct Link
							</Typography>

							<Box
								onClick={() => {
									copy(Link);

									enqueueSnackbar('Copied', { variant: 'success' });
								}}
								sx={{ cursor: 'pointer' }}
							>
								<ContentCopyIcon sx={{ fill: theme?.palette?.infuuse?.blue100 }} />
							</Box>
						</Box>

						<Box
							border="1px solid #76B7F9"
							padding="10px"
							position="relative"
							borderRadius="12px"
							overflow="auto"
							marginTop="7px"
						>
							<Typography
								fontSize="14px"
								color="#676372"
								component="pre"
								sx={{ whiteSpace: 'pre-wrap' }}
								maxWidth="90%"
							>
								{Link}
							</Typography>
						</Box>
					</Box>
				</Stack>

				<Stack>
					<FooterComment sx={{ width: '100%', p: '16px 8px' }} direction={'row'}>
						<LightIcon />
						<Label sx={{ wordBreak: 'break-word', wordWrap: 'break-word', textWrap: 'wrap' }}>
							You can use our direct link and iframe for your website. We recommend iframe for websites
							and direct link for QR codes or other uses you may have.
						</Label>
					</FooterComment>
				</Stack>
			</MemberContainer>
		</Stack>
	);
};

export default ChatSetting;

const CustomSwitch = styled(Switch)(({ theme }) => ({
	width: 60,
	height: 34,
	'& .MuiSwitch-switchBase': {
		margin: 5,
		padding: 0,
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb': {
				backgroundColor: theme?.palette?.infuuse?.blue100,
				width: 24,
				height: 24,
			},
			'& + .MuiSwitch-track': {
				opacity: 0.5,
				backgroundColor: theme?.palette?.infuuse?.blue100,
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme?.palette?.infuuse?.gray500,
		width: 24,
		height: 24,
	},
	'& .MuiSwitch-track': {
		opacity: 0.5,
		backgroundColor: theme?.palette?.infuuse?.gray500,
		borderRadius: 20 / 2,
	},
}));
