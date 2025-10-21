import { Divider, Stack, TableBody, Typography } from '@mui/material';
import React from 'react';
import { useTable } from '@/hooks/useTable';
import { TableContainer, TablePagination, TableWrapper } from '@/components/atoms/Table';
import { SortEnumType, TwilioPhoneNumber, useTwilio_GetListPhoneNumberQuery } from '@/graphql/generated';
import { StyledTableCell } from '../styles';
import Body from './body';
import { NextButton } from '@/components/atoms/Button';
import ModalContainer from '@/components/atoms/Modal';
import AddTwilioNumbersModal from './modal/twilio-add-modal';

const TwilioNumbersTable = () => {
	// ------------------------------- table
	const { page, rowsPerPage, ...tableRest } = useTable();

	// ------------------------------- query
	// get categories
	const { data: TwilioNumbers } = useTwilio_GetListPhoneNumberQuery({
		skip: page * rowsPerPage,
		take: rowsPerPage,
		order: {
			createdDate: SortEnumType?.Desc,
		},
	});
	const TwilioNumbersData = TwilioNumbers?.Twilio_getListPhoneNumber?.result;

	// ------------------------------- modal
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handelModal = () => {
		handleOpen();
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} mb={2}>
				<NextButton sx={{ width: '200px' }} onClick={handelModal}>
					Add Twilio Number
				</NextButton>
			</Stack>

			<TableWrapper>
				<TableContainer
					tableHead={
						<>
							{categoryheaderItems?.map((item) => (
								<StyledTableCell align="left" key={item?.id}>
									<Typography fontSize={'14px'} fontWeight={'bold'}>
										{item?.name}
									</Typography>
								</StyledTableCell>
							))}
						</>
					}
				>
					<TableBody>
						<>
							{TwilioNumbersData?.items?.map((TwilioNumber) => (
									<Body TwilioNumber={TwilioNumber as TwilioPhoneNumber} />
							))}
						</>
					</TableBody>
				</TableContainer>
				<Divider />
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
					<Stack width={'50%'} direction={'row'} justifyContent={'start'} alignItems={'center'}>
						<TablePagination
							page={page}
							rowsPerPage={rowsPerPage}
							totalCount={TwilioNumbersData?.totalCount}
							{...tableRest}
						/>
					</Stack>
					<Stack direction={'row'} justifyContent={'end'} alignItems={'center'} width={'100%'} p={2}>
						{/* <FilterList businessId={businessId} setBusinessId={setBusinessId} /> */}
					</Stack>
				</Stack>{' '}
			</TableWrapper>
			<ModalContainer open={open} handleClose={handleClose}>
				<AddTwilioNumbersModal handleClose={handleClose} />
			</ModalContainer>
		</Stack>
	);
};

export default TwilioNumbersTable;

// -------------------------------header items
const categoryheaderItems = [
	{ id: 'Phone number', name: 'Phone number' },
	{ id: 'Business', name: 'Business' },
	{ id: 'Status', name: 'Status' },
	{ id: 'Options', name: 'Options' },
];
