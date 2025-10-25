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
					sidebars?.contact ? (
						<ContactSidebar />
					) : 
						sidebars?.assign ? (
							<AssignSidebar />
						) :
							sidebars?.ticket ? (
								<TicketSidebar />
							) :
								sidebars?.existContact ? (
									<ExistContactSidebar />
								) : 
									sidebars?.tag ? (
										<TagSidebar />
									) :
										sidebars?.phone ? (
											<PhoneSidebar />
										) :
											sidebars?.calendar ? (
												<CalendarSidebar />
											) : 
												sidebars?.hubspot ? (
													<HubspotSidebar />
												) : (
													<SettingSidebar />
												)
				}
			</BaseSidebarContext.Provider>
		</Stack>
	);
};

export default BaseSidebar;

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

export const BaseSidebarContext = createContext({} as BaseSidebarType);
