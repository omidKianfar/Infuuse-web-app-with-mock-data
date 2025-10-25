import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useRef } from 'react';
import ReacentTab from './recent-tab';
import TagTab from './tag-tab';
import DealTab from './deal-tab';
import NoteTab from './note-tab';
const TabItems = () => {
	const theme = useTheme();

	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const goTab = useRef<HTMLDivElement | null>(null);

	const scrollToTab = () => {
		goTab.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Stack
			position={'relative'}
			border={`1px solid ${theme?.palette?.infuuse.gray200}`}
			height={'100%'}
			borderRadius={'16px'}
			width={'100%'}
			overflow={'auto'}
			p={'4px'}
			bgcolor={theme?.palette?.infuuse.gray200}
		>
			<Stack position={'relative'}>
				<Tabs sx={{ width: '100%' }}>
					<Box sx={{ width: '100%' }}>
						<span ref={goTab} />

						<TabContext value={value}>
							{/* ------------------------------- tabs container*/}
							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
							>
								{/* ------------------------------- tabs list*/}
								<TabList
									textColor={theme?.palette?.infuuse.blue200}
									width={'100%'}
									TabIndicatorProps={{
										sx: {
											backgroundColor: theme?.palette?.infuuse.blue200,
											height: '2px',
										},
									}}
									onChange={handleChange}
									aria-label="lab API tabs example"
									sx={{ width: '100%' }}
								>
									{/* ------------------------------- tabs */}
									{tabs?.map((item) => (
										<Tab
											key={item?.value}
											label={
												<Typography
													sx={{
														textTransform: 'none',
														fontSize: value === item?.value ? '14px' : '14px',
														fontWeight: value === item?.value ? 600 : 400,
														position: 'relative',
														color: theme?.palette?.infuuse.blue200,
													}}
												>
													{item?.title}
												</Typography>
											}
											value={item?.value}
										></Tab>
									))}
								</TabList>
							</Stack>

							{/* ------------------------------- tabs compnents*/}
							<TabPanel value={'1'} sx={{ p: '8px' }}>
								{/* -------------------------------recents */}
								<ReacentTab scrollToTab={scrollToTab}/>
							</TabPanel>

							<TabPanel value={'2'} sx={{ p: '8px' }}>
								{/* -------------------------------tags */}
								<TagTab scrollToTab={scrollToTab}/>
							</TabPanel>

							<TabPanel value={'3'} sx={{ p: '8px' }}>
								{/* -------------------------------deals */}
								<DealTab scrollToTab={scrollToTab}/>
							</TabPanel>

							<TabPanel value={'4'} sx={{ p: '8px 8px 24px 8px' }}>
								{/* ------------------------------- nots */}
								<NoteTab scrollToTab={scrollToTab} />
							</TabPanel>
						</TabContext>
					</Box>
				</Tabs>
			</Stack>
		</Stack>
	);
};

export default TabItems;

const tabs = [
	{ title: 'Recents', value: '1' },
	{ title: 'Tags', value: '2' },
	{ title: 'Deals', value: '3' },
	{ title: 'Notes', value: '4' },
];
