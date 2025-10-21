import { Stack } from '@mui/material';
import React, { createContext, useState } from 'react';
import SettingSidebar from './setting';
import ContactSidebar from './contact';
import ExistContactSidebar from './exist-contact';
import TagSidebar from './tag';
import TicketSidebar from './ticket';
import AssignSidebar from './assign';
import CalendarSidebar from './calendar';
import PhoneSidebar from './phone';
import HubspotSidebar from './hubspot';

const BaseSidebar = () => {
	// -------------------------------sidebar items
	const [sidebars, setSidebars] = useState({
		contact: false,
		assign: false,
		existContact: false,
		ticket: false,
		tag: false,
		phone: false,
		calendar: false,
		hubspot: false,
	});

	return (
		<Stack width={'100%'} height={'100%'}>
			<BaseSidebarContext.Provider value={{ sidebars, setSidebars }}>
				{
					//  -------------------------------contact
					sidebars?.contact ? (
						<ContactSidebar />
					) : // -------------------------------assign
						sidebars?.assign ? (
							<AssignSidebar />
						) : // -------------------------------ticket
							sidebars?.ticket ? (
								<TicketSidebar />
							) : // -------------------------------exist contact
								sidebars?.existContact ? (
									<ExistContactSidebar />
								) : // -------------------------------tag
									sidebars?.tag ? (
										<TagSidebar />
									) : // -------------------------------phone
										sidebars?.phone ? (
											<PhoneSidebar />
										) : // -------------------------------calendar
											sidebars?.calendar ? (
												<CalendarSidebar />
											) : // -------------------------------hubspot
												sidebars?.hubspot ? (
													<HubspotSidebar />
												) : (
													// -------------------------------setting
													<SettingSidebar />
												)
				}
			</BaseSidebarContext.Provider>
		</Stack>
	);
};

export default BaseSidebar;

// -------------------------------export type
type BaseSidebarType = {
	sidebars: {
		contact: boolean;
		assign: boolean;
		existContact: boolean;
		ticket: boolean;
		tag: boolean;
		phone: boolean;
		calendar: boolean;
		hubspot: boolean;
	};

	setSidebars: React.Dispatch<
		React.SetStateAction<{
			contact: boolean;
			assign: boolean;
			existContact: boolean;
			ticket: boolean;
			tag: boolean;
			phone: boolean;
			calendar: boolean;
			hubspot: boolean;
		}>
	>;
};

// -------------------------------context
export const BaseSidebarContext = createContext({} as BaseSidebarType);
