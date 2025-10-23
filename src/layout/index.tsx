// Layout.tsx
import React, { lazy, Suspense } from 'react';
import { Stack, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser_GetCurrentUserQuery, AccountStatus, UserType } from '@/graphql/generated';
import { AuthGuard } from '@/guards';
import RoleGuard from '@/guards/RoleGuard';
import NoResponsive from '@/components/molecules/no-responsive';
import FullscreenLoading from '@/components/organisms/FullscreenLoading';

// Lazy components
const MainLayout = lazy(() => import('./main-layout'));
const BaseLayout = lazy(() => import('./base-layout'));
const ChatLayout = lazy(() => import('./chat-layout'));
const DeactivePage = lazy(() => import('@/components/pages/auth/sign/deactive-page'));
const DeactivePayment = lazy(() => import('@/components/pages/auth/sign/deactive-peyment-page'));

// Styled layouts
const AuthLayout = styled(Stack)({ width: '100vw', height: '100vh' });
const NotificationLayout = styled(Stack)({ width: '100vw', height: '100vh' });

const layoutMap: { [key: string]: React.ElementType } = {
	MainLayout,
	BaseLayout,
	AuthLayout,
	ChatLayout,
	NotificationLayout,
	contactLayout: AuthLayout,
};

const layoutsWithoutRoleGuard = ['contactLayout', 'AuthLayout'];

type LayoutProps = React.PropsWithChildren & {
	type?: 'MainLayout' | 'BaseLayout' | 'AuthLayout' | 'ChatLayout' | 'contactLayout' | string;
	accessibleRoles?: string[];
};

export default function Layout({ type = 'MainLayout', children, accessibleRoles }: LayoutProps) {
	const theme = useTheme();
	const router = useRouter();
	const isMobile = false; // useMediaQuery(theme.breakpoints.down('md'));

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// No responsive page
	if (isMobile && !['/contact-chat', '/signin', '/signup'].some((p) => router.pathname.includes(p))) {
		return <NoResponsive />;
	}

	const SelectedLayout = layoutMap[type] || AuthLayout;
	const requiresRoleGuard = !layoutsWithoutRoleGuard.includes(type);

	return (
		<Suspense fallback={<FullscreenLoading />}>
			{requiresRoleGuard ? (
				<>
					{CurrentUser?.user?.userType === UserType.BusinessMember &&
					CurrentUser?.businessAccesses?.[0]?.business?.status === AccountStatus.Suspended ? (
						<DeactivePage />
					) : CurrentUser?.user?.userType === UserType.BusinessMember &&
					  CurrentUser?.businessAccesses?.[0]?.business?.status ===
							AccountStatus.AwaitingSubscriptionPayment ? (
						<DeactivePayment />
					) : (
						<AuthGuard>
							<RoleGuard accessibleRoles={accessibleRoles}>
								<SelectedLayout>{children}</SelectedLayout>
							</RoleGuard>
						</AuthGuard>
					)}
				</>
			) : (
				<SelectedLayout>{children}</SelectedLayout>
			)}
		</Suspense>
	);
}
