import config from 'config';
import { getAuth } from 'firebase/auth';
import { GraphQLClient, Variables } from 'graphql-request';
import { ACCESS_TOKEN_KEY } from 'src/utils/constants';
import { getCookie, saveCookie } from 'src/utils/storage/cookieStorage';

export const graphQLClient = new GraphQLClient(config.apiUrl as string);

export function fetcher<TData, TVariables extends Variables | undefined>(query: string, variables?: TVariables) {
	return async (): Promise<TData> => {
		return await graphQLClient.request(query, variables);
	};
}

function jwtDecode(token: string) {
	// console.log({ token });
	if (token === 'undefined' || token === undefined) return {};
	const base64Url = token.split('.')[1];
	const base64 = base64Url?.replace?.(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join('')
	);

	return JSON.parse(jsonPayload);
}

export const isTokenExpired = (token: string): boolean => {
	const decoded = jwtDecode(token);
	const isExpired = decoded.exp < Date.now() / 1000;

	return isExpired;
};
