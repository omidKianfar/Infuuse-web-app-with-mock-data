// import { UseQueryOptions } from '@tanstack/react-query';
// import { User_LoginQuery, Users, useUser_LoginQuery } from 'src/graphql/generated';
// import { useAuth } from 'src/providers/AuthProvider';

// interface ReturnType {
// 	userData: Users;
// 	userLoading: boolean;
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function useGetUser(options?: UseQueryOptions<User_LoginQuery, any, any>): ReturnType {
// 	const { isAuthenticated } = useAuth();
// 	const { data, isLoading } = useUser_LoginQuery(
// 		{},
// 		{
// 			enabled: isAuthenticated,
// 			...options,
// 		}
// 	);

// 	return {
// 		userLoading: isLoading,
// 		userData: data?.user_login?.result,
// 	};
// }
