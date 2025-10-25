import { UserType, useUser_GetCurrentUserQuery } from '@/graphql/generated';
import OwnerGroupUserSearch from './owner';
import AgencyGroupUserSearch from './agency';


interface props {
	choosenGroupUser: never[];
	setChoosenGroupUser: React.Dispatch<React.SetStateAction<never[]>>;
}

const GroupUserSearch = ({
	choosenGroupUser, setChoosenGroupUser
}: props) => {
	const { data: User } = useUser_GetCurrentUserQuery();
	const CurrentUser = User?.user_getCurrentUser?.result;

	return (
		<>
			{CurrentUser?.user?.userType === UserType?.BusinessMember ? (
				<OwnerGroupUserSearch
					choosenGroupUser={choosenGroupUser}
					setChoosenGroupUser={setChoosenGroupUser}
				/>
			) : (
				<AgencyGroupUserSearch
					choosenGroupUser={choosenGroupUser}
					setChoosenGroupUser={setChoosenGroupUser}
				/>
			)}
		</>
	);
};

export default GroupUserSearch;
