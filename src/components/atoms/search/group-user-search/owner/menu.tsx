import CloseIconBox from '@/assets/close-icon-box';
import UserIcon from '@/assets/user-icon';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
	AgencyMember,
	BusinessMember,
	useAgencyMember_GetListQuery,
	useBusiness_GetTeamByBusinessIdQuery,
	useBusinessMember_GetListQuery,
	UserType,
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

	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;


	const { data: BusinessMembersTeam } = useBusiness_GetTeamByBusinessIdQuery({
		businessId: Number(CurrentUser?.businessAccesses[0]?.business?.id),
		skip: 0,
		take: 10000,
		where: {
			id: {
				neq: Number(CurrentUser?.user?.id)
			}
		}
	});
	const BusinessMemberTeamList = BusinessMembersTeam?.business_getTeamByBusinessId?.result;


	const choosenUserBusinessHandler = (user: BusinessMember) => {
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
			bgcolor={theme?.palette?.common?.white}
			maxHeight={'200px'}
			overflow={'auto'}
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
				{BusinessMemberTeamList?.items?.map((user) => (
					<Stack key={user?.id} onClick={() => choosenUserBusinessHandler(user as BusinessMember)}>
						<SearchItem direction={'row'}>
							<Stack mr={2}>
								<Avatar src={getFullImageUrl(user?.photoUrl)} width={'32px'} height={'32px'} />
							</Stack>

							<Typography> {stringSlicer(user?.fullName, 40)}</Typography>
						</SearchItem>
					</Stack>
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
