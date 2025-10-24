import { Stack, useTheme } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import {
    NotificationType,
    useNotification_SetReadStatusMutation,
} from '@/graphql/generated';
import { responseDestructure } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from 'pages/_app';
import { NotificationProps } from '../../type';
import HeaderNotification from './header';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';

const TicketNotification = lazy(() => import('./ticket'))
const AssignMemberNotification = lazy(() => import('./assign-member'))

const Notifications = ({ NotificationData, setNotificationState }: Partial<NotificationProps>) => {
    const theme = useTheme();

    const [notifIds, setNotifIds] = React.useState<number[] | null>(null);

    const { mutate: ReadNotifications } = useNotification_SetReadStatusMutation();

    React.useEffect(() => {
        const ids: number[] = [];
        if (NotificationData) {
            NotificationData?.items?.map((notif) => ids?.push(notif?.id as number));
        }
        setNotifIds(ids);
    }, [NotificationData]);

    const notificationsRead = () => {
        ReadNotifications(
            {
                ids: notifIds,
            },
            {
                onSuccess: (data) => {
                    const { status } = responseDestructure(data);
                    if (status.code == 1) {
                        queryClient.invalidateQueries(['notification_getList']);
                    } else {
                        enqueueSnackbar(status.description, { variant: 'error' });
                    }
                },
            }
        );
    };

    const notificationRead = (id: number) => {
        ReadNotifications(
            {
                ids: [id],
            },
            {
                onSuccess: (data) => {
                    const { status } = responseDestructure(data);
                    if (status.code == 1) {
                        queryClient.invalidateQueries(['notification_getList']);
                    } else {
                        enqueueSnackbar(status.description, { variant: 'error' });
                    }
                },
            }
        );
    };

    return (
        <div>
            <Stack
                position={'absolute'}
                top={'70px'}
                right={'32px'}
                height={'100%'}
                maxHeight={'350px'}
                overflow={'auto'}
                width={'400px'}
                bgcolor={theme?.palette?.common?.white}
                p={'12px '}
                borderRadius={4}
                zIndex={10000}
                boxShadow={4}
            >
                <HeaderNotification notificationsRead={notificationsRead} setNotificationState={setNotificationState} />

                {NotificationData?.items?.map((notification) => {
                    let NotificationConvert = {};

                    if (notification?.content) {
                        try {
                            NotificationConvert = JSON.parse(notification?.content);
                        } catch (error) {
                            console.log('Error: ', error);
                        }
                    }

                    return (
                        <Stack>
                            <Suspense fallback={<LoadingProgress />}>
                                {notification?.type === NotificationType?.Ticket ? (
                                    <TicketNotification
                                        NotificationConvert={NotificationConvert}
                                        notificationRead={notificationRead}
                                        notification={notification}
                                    />
                                ) : notification?.type === NotificationType?.AssignMemberToConversation ? (
                                    <AssignMemberNotification
                                        NotificationConvert={NotificationConvert}
                                        notificationRead={notificationRead}
                                        notification={notification}
                                    />
                                ) : null}

                            </Suspense>

                        </Stack>
                    );
                })}
            </Stack>
        </div>
    )
}

export default Notifications
