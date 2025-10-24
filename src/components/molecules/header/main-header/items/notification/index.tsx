import NotificationIcon from '@/assets/notification-icon';
import { IconBoxBadge } from '@/components/molecules/sidebars/first-sidebar/styles';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { NotificationProps } from '../../type';

const NotificationItem = ({ notificationHandler, NotificationData }: Partial<NotificationProps>) => {
	const theme = useTheme();

	const NotificationLength = (NotificationData?.items?.length ?? 0) > 0
	return (
		<>
			<Tooltip title="Notification">
				<Box onClick={notificationHandler} sx={{ cursor: 'pointer', ml: 2, position: 'relative' }}>
					{NotificationLength ? (
						<IconBoxBadge>
							<Typography color={theme?.palette?.common?.white}>
								{NotificationData?.items?.length}
							</Typography>
						</IconBoxBadge>
					) : null}

					<NotificationIcon
						fill={
							NotificationLength
								? theme?.palette?.infuuse.orange300
								: theme?.palette?.infuuse.gray500
						}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

export default NotificationItem;
