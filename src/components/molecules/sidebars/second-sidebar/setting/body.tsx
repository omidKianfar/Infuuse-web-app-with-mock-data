import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const BodySettingSidebar = () => {
	// -------------------------------tools
	const theme = useTheme();

	const router = useRouter();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<SettingMenu direction={'column'} justifyContent={'start'} alignItems={'start'} py={2}>
			<>
				{CurrentUser?.user?.userType === UserType?.Administrator ? (
					<>
						{/* -------------------------------profile */}
						<Box onClick={() => router?.push('/admin/profile')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								color={
									router?.pathname === '/admin/profile'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontSize={'16px'}
								fontWeight={router?.pathname === '/admin/profile' ? 'bold' : 'regular'}
							>
								Profile
							</Typography>
						</Box>

						{/* -------------------------------infuuse administrators */}
						<Box
							onClick={() => router?.push('/admin/infuuse-administrators')}
							sx={{ cursor: 'pointer', mb: 2 }}
						>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/admin/infuuse-administrators'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/admin/infuuse-administrators' ? 'bold' : 'regular'}
							>
								InFUUSE Administrators
							</Typography>
						</Box>

						{/* -------------------------------whatsapp numbers */}
						<Box onClick={() => router?.push('/admin/whatsapp-numbers')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/admin/whatsapp-numbers'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/admin/whatsapp-numbers' ? 'bold' : 'regular'}
							>
								Whatsapp Numbers
							</Typography>
						</Box>

						{/* -------------------------------twilio numbers */}
						<Box onClick={() => router?.push('/admin/twilio-numbers')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/admin/twilio-numbers'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/admin/twilio-numbers' ? 'bold' : 'regular'}
							>
								Twilio Numbers
							</Typography>
						</Box>
					</>
				) : (
					<>
						{/* -------------------------------profile */}
						<Box onClick={() => router?.push('/profile')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								color={
									router?.pathname === '/profile'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontSize={'16px'}
								fontWeight={router?.pathname === '/profile' ? 'bold' : 'regular'}
							>
								Profile
							</Typography>
						</Box>

						{/* -------------------------------members */}
						<Box onClick={() => router?.push('/members')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/members'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/members' ? 'bold' : 'regular'}
							>
								Members
							</Typography>
						</Box>

						{/* -------------------------------templates */}
						{CurrentUser?.isBusinessOwner ||
							CurrentUser?.user?.userType === UserType?.AgencyMember ||
							(CurrentUser?.user?.userType === UserType?.BusinessMember &&
								CurrentUser?.businessAccesses?.[0]?.access?.isSettingsManagmentAccess) ? (
							<Box onClick={() => router?.push('/templates')} sx={{ cursor: 'pointer', mb: 2 }}>
								<Typography
									fontSize={'16px'}
									color={
										router?.pathname === '/templates'
											? theme?.palette?.infuuse.blue200
											: theme?.palette?.common?.black
									}
									fontWeight={router?.pathname === '/templates' ? 'bold' : 'regular'}
								>
									Templates
								</Typography>
							</Box>
						) : null}

						{/* -------------------------------tags */}
						<Box onClick={() => router?.push('/tags')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/tags'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/tags' ? 'bold' : 'regular'}
							>
								Tags
							</Typography>
						</Box>

						{/* -------------------------------business */}
						<Box onClick={() => router?.push('/businesses')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/businesses'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/businesses' ? 'bold' : 'regular'}
							>
								{CurrentUser?.user?.userType === UserType?.BusinessMember ? 'Business' : 'Businesses'}
							</Typography>
						</Box>

						{/* -------------------------------subscription or payment */}
						<Box onClick={() => router?.push('/subscriptions')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/subscriptions'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/subscriptions' ? 'bold' : 'regular'}
							>
								Subscriptions
							</Typography>
						</Box>

						{/* -------------------------------categories */}
						<Box onClick={() => router?.push('/categories')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/categories'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/categories' ? 'bold' : 'regular'}
							>
								Categories
							</Typography>
						</Box>

						{/* -------------------------------live chat */}
						<Box onClick={() => router?.push('/chat-setting')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/chat-setting'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/chat-setting' ? 'bold' : 'regular'}
							>
								Live Chat
							</Typography>
						</Box>

						{/* -------------------------------social channel */}

						{CurrentUser?.isBusinessOwner ||
							CurrentUser?.user?.userType === UserType?.AgencyMember ||
							(CurrentUser?.user?.userType === UserType?.BusinessMember &&
								CurrentUser?.businessAccesses?.[0]?.access?.isSocialManagmentAccess) ? (
							<Box onClick={() => router?.push('/social-channels')} sx={{ cursor: 'pointer', mb: 2 }}>
								<Typography
									fontSize={'16px'}
									color={
										router?.pathname === '/social-channels'
											? theme?.palette?.infuuse.blue200
											: theme?.palette?.common?.black
									}
									fontWeight={router?.pathname === '/social-channels' ? 'bold' : 'regular'}
								>
									Social Channels
								</Typography>
							</Box>
						) : null}

						{/* -------------------------------hubspot */}
						<Box onClick={() => router?.push('/HubSpot')} sx={{ cursor: 'pointer', mb: 2 }}>
							<Typography
								fontSize={'16px'}
								color={
									router?.pathname === '/HubSpot'
										? theme?.palette?.infuuse.blue200
										: theme?.palette?.common?.black
								}
								fontWeight={router?.pathname === '/HubSpot' ? 'bold' : 'regular'}
							>
								HubSpot
							</Typography>
						</Box>
					</>
				)}
			</>
		</SettingMenu>
	);
};

export default BodySettingSidebar;

const SettingMenu = styled(Stack)({
	width: '100%',
	height: '100%',
	maxHeight: '60vh',
	overflowY: 'auto',
	margin: '16px 0',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
