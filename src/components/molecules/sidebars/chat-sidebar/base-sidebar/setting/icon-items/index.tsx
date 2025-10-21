import CalendarIcon from '@/assets/calendar-icon';
import HubspotIcon from '@/assets/hubspot-icon';
import PhoneIcon from '@/assets/phone-icon';
import TagIcon from '@/assets/tag-icon';
import { Box, Stack, styled, Tooltip, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BaseSidebarContext } from '../..';
import { useContact_GetByContactIdQuery, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import { useRouter } from 'next/router';

const IconItems = () => {
	// -------------------------------tools
	const theme = useTheme();
	const router = useRouter();

	const ContactId = router?.query?.contactId

	// -------------------------------context
	const { sidebars, setSidebars } = useContext(BaseSidebarContext);

	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;


	const { data: Contact } = useContact_GetByContactIdQuery({
		contactId: Number(ContactId)
	})
	const ContactData = Contact?.contact_getByContactId?.result

	const hubSpotRouter = () => {
		setSidebars({
			...sidebars,
			hubspot: true,
		})
	}

	return (
		<Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'} mb={1}>
			{/* -------------------------------tag */}
			<Tooltip title="Tag">
				<IconBox
					onClick={() =>
						setSidebars({
							...sidebars,
							tag: true,
						})
					}
				>
					<TagIcon />
				</IconBox>
			</Tooltip>

			{/* -------------------------------phone */}
			<Tooltip title="Call">
				<IconBox
					onClick={() =>
						setSidebars({
							...sidebars,
							phone: true,
						})
					}
				>
					<PhoneIcon fill={theme?.palette?.infuuse?.green200} />
				</IconBox>
			</Tooltip>

			{/* -------------------------------calendar */}
			<Tooltip title="Calendar Ticket">
				<IconBox
					onClick={() =>
						setSidebars({
							...sidebars,
							calendar: true,
						})
					}
				>
					<CalendarIcon />
				</IconBox>
			</Tooltip>
			{/* -------------------------------hubspot */}

			<Tooltip title={ContactData?.hubSpotContactId ? "Connect HubSpot" : 'No Connect HubSpot'}>
				<IconBox
					onClick={hubSpotRouter}
				>
					<HubspotIcon fill={ContactData?.hubSpotContactId ? '#FF7A59' : theme?.palette?.infuuse?.gray500} />
				</IconBox>
			</Tooltip>
		</Stack>
	);
};

export default IconItems;

export const IconBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '16px',
	backgroundColor: theme?.palette?.infuuse.gray200,
	width: '42px',
	height: '42px',
	cursor: 'pointer',
}));
