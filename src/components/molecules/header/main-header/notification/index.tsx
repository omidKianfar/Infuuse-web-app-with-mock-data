import React, { lazy, Suspense } from 'react';
import {
	NotificationCollectionSegment,
} from '@/graphql/generated';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';
import { NotificationProps } from '../type';

const Notifications = lazy(() => import('./notifications'))
const EmptyNotification = lazy(() => import('./notifications/Empty-notification'))



const NotificationsBox = ({ setNotificationState, NotificationData }: Partial<NotificationProps>) => {

	return (
		<Suspense fallback={<LoadingProgress />}>
			{(NotificationData?.items?.length ?? 0) > 0 ? (
				<Notifications NotificationData={NotificationData as NotificationCollectionSegment} setNotificationState={setNotificationState} />
			) : (
				<EmptyNotification setNotificationState={setNotificationState} />
			)}
		</Suspense>
	);
};

export default NotificationsBox;
