import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface MenuItem {
	label: string;
	path: string;
	show?: (user: any) => boolean;
}

const allMenuItems: MenuItem[] = [
	// Admin menu
	{
		label: 'Profile',
		path: '/admin/profile',
		show: user => user?.user?.userType === UserType.Administrator,
	},
	{
		label: 'InFUUSE Administrators',
		path: '/admin/infuuse-administrators',
		show: user => user?.user?.userType === UserType.Administrator,
	},
	{
		label: 'Whatsapp Numbers',
		path: '/admin/whatsapp-numbers',
		show: user => user?.user?.userType === UserType.Administrator,
	},
	{
		label: 'Twilio Numbers',
		path: '/admin/twilio-numbers',
		show: user => user?.user?.userType === UserType.Administrator,
	},

	// Regular user menu
	{ label: 'Profile', path: '/profile', show: () => true },
	{ label: 'Members', path: '/members', show: () => true },
	{
		label: 'Templates',
		path: '/templates',
		show: user =>
			user?.isBusinessOwner ||
			user?.user?.userType === UserType.AgencyMember ||
			(user?.user?.userType === UserType.BusinessMember &&
				user?.businessAccesses?.[0]?.access?.isSettingsManagmentAccess),
	},
	{ label: 'Tags', path: '/tags', show: () => true },
	{
		label: 'Business / Businesses',
		path: '/businesses',
		show: () => true,
	},
	{ label: 'Subscriptions', path: '/subscriptions', show: () => true },
	{ label: 'Categories', path: '/categories', show: () => true },
	{ label: 'Live Chat', path: '/chat-setting', show: () => true },
	{
		label: 'Social Channels',
		path: '/social-channels',
		show: user =>
			user?.isBusinessOwner ||
			user?.user?.userType === UserType.AgencyMember ||
			(user?.user?.userType === UserType.BusinessMember &&
				user?.businessAccesses?.[0]?.access?.isSocialManagmentAccess),
	},
	{ label: 'HubSpot', path: '/HubSpot', show: () => true },
];

const BodySettingSidebar = () => {
	const theme = useTheme();
	const router = useRouter();
	const { data: userData } = useUser_GetCurrentUserQuery();
	const currentUser = userData?.user_getCurrentUser?.result;

	const menuItems = useMemo(
		() => allMenuItems.filter(item => (item.show ? item.show(currentUser) : true)),
		[currentUser]
	);

	const getTypographyProps = (path: string) => ({
		color: router.pathname === path ? theme.palette.infuuse.blue200 : theme.palette.common.black,
		fontSize: '16px',
		fontWeight: router.pathname === path ? 'bold' : 'regular',
	});

	return (
		<SettingMenu direction="column" justifyContent="start" alignItems="start" py={2}>
			{menuItems.map(item => (
				<Box
					key={item.path}
					onClick={() => router.push(item.path)}
					sx={{ cursor: 'pointer', mb: 2 }}
				>
					<Typography {...getTypographyProps(item.path)}>
						{item.label === 'Business / Businesses'
							? currentUser?.user?.userType === UserType.BusinessMember
								? 'Business'
								: 'Businesses'
							: item.label}
					</Typography>
				</Box>
			))}
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
	'&::-webkit-scrollbar': { display: 'none' },
	scrollbarWidth: 'none',
	scrollbarColor: 'transparent transparent',
});
