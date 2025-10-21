
import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
	AgencyMember,
	PermissionType,
	useAgency_GetMemberTeamQuery,
	useUser_GetCurrentUserQuery,
} from '@/graphql/generated';
import { enqueueSnackbar } from 'notistack';
import { getFullImageUrl } from '@/utils';
import { stringSlicer } from '@/components/atoms/string-slicer/string-slicer';
import Avatar from '@/components/atoms/avatar';

interface Props {
	setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
	choosenGroupUser: never[];
	setChoosenGroupUser: React.Dispatch<React.SetStateAction<never[]>>;
	setSearchData: React.Dispatch<React.SetStateAction<string>>;
}

const SearchMenuBody = ({ setSearchMenu, choosenGroupUser, setChoosenGroupUser, setSearchData }: Props) => {
	const theme = useTheme();

	// -------------------------------query
	// current user
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	// agency member query
	const { data: AgencyTeams } = useAgency_GetMemberTeamQuery({
		permissionType: PermissionType?.None,
	});
	const AgencyMemberList = AgencyTeams?.agency_getMemberTeam?.result;

	// user agency choose
	const choosenConatctHandler = (user: AgencyMember) => {
		if (!choosenGroupUser.includes(user)) {
			setChoosenGroupUser([...choosenGroupUser, user]);
			setSearchData('');
			setSearchMenu(false);
		} else {
			enqueueSnackbar('List include this user', { variant: 'error' });
		}
	};

	return (
		<Stack
			width={'100%'}
			border={`1px solid ${theme.palette?.infuuse?.gray500}`}
			borderRadius={'16px'}
			p={'8px'}
			position={'absolute'}
			zIndex={100}
			top={'56px'}
			left={0}
			maxHeight={'200px'}
			overflow={'auto'}
			bgcolor={theme?.palette?.common?.white}
		>
			<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
				<Stack onClick={() => setSearchMenu(false)} sx={{ cursor: 'pointer' }}>
					<CloseIcon
						sx={{
							'&:hover': {
								color: theme?.palette?.infuuse?.red300,
							},
						}}
					/>
				</Stack>
			</Stack>
			{/* -------------------------------search items (query) */}


			<>
				{AgencyMemberList?.agencyMembers?.filter((member) => Number(member?.id) !== Number(CurrentUser?.user?.id))?.map((user) => (
					<Stack key={user?.id} onClick={() => choosenConatctHandler(user as AgencyMember)}>
						<SearchItem direction={'row'}>
							<Stack mr={2}>
								<Avatar src={getFullImageUrl(user?.photoUrl)} width={'32px'} height={'32px'} />
							</Stack>

							<Typography> {stringSlicer(user?.fullName, 40)}</Typography>
						</SearchItem>
					</Stack>
				))}
				{AgencyMemberList?.businessAccesses?.map((businessAccess) => (
					businessAccess?.businessTeams?.filter((member) => Number(member?.id) !== Number(CurrentUser?.user?.id))?.map((businessTeams) => (
						<Stack key={businessTeams?.id} onClick={() => choosenConatctHandler(businessTeams as AgencyMember)}>
							<SearchItem direction={'row'}>
								<Stack mr={2}>
									<Avatar src={getFullImageUrl(businessTeams?.photoUrl)} width={'32px'} height={'32px'} />
								</Stack>

								<Typography> {stringSlicer(businessTeams?.fullName, 40)}</Typography>
							</SearchItem>
						</Stack>
					))

				))}
			</>

		</Stack>
	);
};

export default SearchMenuBody;

export const SearchItem = styled(Stack)(({ theme }) => ({
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
	marginBottom: '16px',
	cursor: 'pointer',
	'&:hover': {
		padding: '8px',
		borderRadius: '8px',
		backgroundColor: theme.palette.infuuse?.blue100,
	},
}));
