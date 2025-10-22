import { fetcher, graphQLClient } from 'src/graphql/fetcher';
import { User_GetCurrentUserDocument, User_GetCurrentUserQuery } from 'src/graphql/generated';

export async function getUser(token: string) {
	graphQLClient.setHeader('Authorization', 'Bearer ' + token);

	const response = await fetcher<User_GetCurrentUserQuery, undefined>(User_GetCurrentUserDocument)();

	return response.user_getCurrentUser;
}
