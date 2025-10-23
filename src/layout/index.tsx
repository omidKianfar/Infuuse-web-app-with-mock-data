import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';
import NoResponsive from '@/components/molecules/no-responsive';
import { AccountStatus, UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { AuthGuard } from '@/guards';
import RoleGuard from '@/guards/RoleGuard';
import { Stack, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { lazy, Suspense } from 'react';
import MainLayout from './main-layout';
import BaseLayout from './base-layout';

const ChatLayout = lazy(() => import('./chat-layout'));
const DeactivePage = lazy(() => import('@/components/pages/auth/sign/deactive-page'));
const DeactivePayment = lazy(() => import('@/components/pages/auth/sign/deactive-peyment-page'));

const AuthLayout = styled(Stack)({
	width: '100vw',
	height: '100vh',
});

const NotificationLayout = styled(Stack)({
	width: '100vw',
	height: '100vh',
});

const layoutsWithoutRoleGuard = ['contactLayout', 'AuthLayout'];

// -------------------- type props
type LayoutProps = React.PropsWithChildren & {
	type?: 'MainLayout' | 'BaseLayout' | 'AuthLayout' | 'ChatLayout' | 'contactLayout' | string;
	accessibleRoles?: Array<string>;
};

const layoutMap: { [key: string]: React.ElementType } = {
	MainLayout,
	BaseLayout,
	AuthLayout,
	ChatLayout,
	NotificationLayout,
	contactLayout: AuthLayout,
};

export default function Layout({ type = 'MainLayout', children, accessibleRoles }: LayoutProps) {
	const router = useRouter();
	const isMobile = false;

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	if (
		isMobile &&
		!router?.pathname.includes('/contact-chat') &&
		!router?.pathname.includes('/signin') &&
		!router?.pathname.includes('/signup')
	) {
		return <NoResponsive />;
	}

	const SelectedLayout = layoutMap[type] || AuthLayout;
	const requiresRoleGuard = !layoutsWithoutRoleGuard.includes(type);

	return (
		<Suspense fallback={<LoadingProgress />}>
			{requiresRoleGuard ? (
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
			) : (
				<SelectedLayout>{children}</SelectedLayout>
			)}
		</Suspense>
	);
}
