import NoResponsive from '@/components/molecules/no-responsive';
import DeactivePage from '@/components/pages/auth/sign/deactive-page';
import DeactivePayment from '@/components/pages/auth/sign/deactive-peyment-page';
import { AccountStatus, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { AuthGuard } from '@/guards';
import RoleGuard from '@/guards/RoleGuard';
import { Stack, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import BaseLayout from './base-layout';
import ChatLayout from './chat-layout';
import MainLayout from './main-layout';

// -------------------- type props
type LayoutProps = React.PropsWithChildren & {
	type?: 'MainLayout' | 'BaseLayout' | 'AuthLayout' | 'ChatLayout' | 'contactLayout' | string;
	accessibleRoles?: Array<string>;
};

// ------------------ auth layout
const AuthLayout = styled(Stack)({
	width: '100vw',
	height: '100vh',
});
// ------------------ auth layout
const NotificationLayout = styled(Stack)({
	width: '100vw',
	height: '100vh',
});

// ------------------ layout types
const layoutMap: { [key: string]: React.ElementType } = {
	MainLayout,
	BaseLayout,
	AuthLayout,
	ChatLayout,
	NotificationLayout,
	contactLayout: AuthLayout,
};

// -------------------- layout without role gard
const layoutsWithoutRoleGuard = ['contactLayout', 'AuthLayout'];

export default function Layout({ type = 'MainLayout', children, accessibleRoles }: LayoutProps) {
	// --------------------------------tools
	const theme = useTheme();
	const router = useRouter();
	const isMobile = false; // useMediaQuery(theme.breakpoints.down('md'));

	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// useCallManagement();
	// ------------------------- no responsive page
	if (
		isMobile &&
		!router?.pathname.includes('/contact-chat') &&
		!router?.pathname.includes('/signin') &&
		!router?.pathname.includes('/signup')
	) {
		return <NoResponsive />;
	}

	// ------------------------ layout types selected
	const SelectedLayout = layoutMap[type] || AuthLayout;

	// ------------------------ layout not in the role gard
	const requiresRoleGuard = !layoutsWithoutRoleGuard.includes(type);

	return (
		<>
			{/* {requiresRoleGuard ? (
				<>
					{CurrentUser?.user?.userType === UserType?.BusinessMember &&
					CurrentUser?.businessAccesses?.[0]?.business?.status === AccountStatus?.Suspended ? (
						<DeactivePage />
					) : CurrentUser?.user?.userType === UserType?.BusinessMember &&
					  CurrentUser?.businessAccesses?.[0]?.business?.status ===
							AccountStatus?.AwaitingSubscriptionPayment ? (
						<DeactivePayment />
					) : (
						<AuthGuard>
							<RoleGuard accessibleRoles={accessibleRoles}>
								<SelectedLayout>{children}</SelectedLayout>
							</RoleGuard>
						</AuthGuard>
					)}
				</>
			) : ( */}
				<SelectedLayout>{children}</SelectedLayout>
			{/* )} */}
		</>
	);
}
